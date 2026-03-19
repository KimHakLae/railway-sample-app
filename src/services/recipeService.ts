import prisma from '../lib/prisma';
import { Recipe, Ingredient } from '@prisma/client';

export type RecipeWithIngredients = Recipe & {
  ingredients: {
    id: number;
    amount: string | null;
    ingredient: Ingredient;
  }[];
};

const difficultyMap: Record<string, number> = {
  'EASY': 1,
  'MEDIUM': 3,
  'HARD': 5
};

/** 레시피 전체 조회 */
export const getAllRecipes = async (): Promise<Recipe[]> => {
  return prisma.recipe.findMany({
    orderBy: { createdAt: 'desc' },
  });
};

/** 레시피 상세 조회 (재료 포함) */
export const getRecipeById = async (id: number): Promise<RecipeWithIngredients | null> => {
  const recipe = await prisma.recipe.findUnique({
    where: { id },
    include: {
      ingredients: {
        include: {
          ingredient: true
        }
      }
    }
  });

  if (!recipe) return null;
  return recipe as RecipeWithIngredients;
};

/** 레시피 생성 */
export const createRecipe = async (data: {
  user_id: number;
  title: string;
  description?: string;
  instructions?: string;
  difficulty?: string;
  cookingTime?: number;
  ingredients?: { ingredientId: number; amount: string }[];
}) => {
  return prisma.recipe.create({
    data: {
      user_id: data.user_id,
      title: data.title,
      description: data.description,
      instructions: data.instructions,
      difficulty: difficultyMap[data.difficulty || 'MEDIUM'] || 3,
      cookTime: data.cookingTime,
      ingredients: {
        create: data.ingredients?.map(ing => ({
          ingredient_id: ing.ingredientId,
          amount: ing.amount
        }))
      }
    },
    include: {
      ingredients: {
        include: {
          ingredient: true
        }
      }
    }
  });
};

/** 레시피 수정 */
export const updateRecipe = async (id: number, data: {
  title?: string;
  description?: string;
  instructions?: string;
  difficulty?: string;
  cookingTime?: number;
  ingredients?: { ingredientId: number; amount: string }[];
}) => {
  if (data.ingredients) {
    await prisma.recipeIngredient.deleteMany({
      where: { recipe_id: id }
    });
  }

  return prisma.recipe.update({
    where: { id },
    data: {
      title: data.title,
      description: data.description,
      instructions: data.instructions,
      difficulty: data.difficulty ? difficultyMap[data.difficulty] : undefined,
      cookTime: data.cookingTime,
      ingredients: {
        create: data.ingredients?.map(ing => ({
          ingredient_id: ing.ingredientId,
          amount: ing.amount
        }))
      }
    },
    include: {
      ingredients: {
        include: {
          ingredient: true
        }
      }
    }
  });
};

/** 레시피 삭제 */
export const deleteRecipe = async (id: number): Promise<void> => {
  await prisma.recipe.delete({ where: { id } });
};

/** 추천 레시피 조회 로직 (모든 사용자 공통: 최신순 10개) */
export const getRecommendedRecipes = async (_userId: number): Promise<(RecipeWithIngredients & { score: number })[]> => {
  const recipes = await prisma.recipe.findMany({
    take: 10,
    orderBy: { createdAt: 'desc' },
    include: {
      ingredients: {
        include: {
          ingredient: true
        }
      }
    }
  });

  return recipes.map(recipe => ({
    ...(recipe as RecipeWithIngredients),
    score: 1.0 // 공통 추천이므로 기본 점수 부여
  }));
};

/** 요리 완료 시 재료 소모 로직 */
export const consumeIngredients = async (userId: number, recipeId: number): Promise<void> => {
  // 1. 레시피가 필요한 재료 목록 가져오기
  const recipe = await prisma.recipe.findUnique({
    where: { id: recipeId },
    include: { ingredients: true }
  });

  if (!recipe) throw new Error('Recipe not found');

  // 2. 각 재료에 대해 재고 차감 (유통기한 임박순)
  for (const ri of recipe.ingredients) {
    // 해당 식재료의 가장 오래된(유통기한 임박) 재고 하나 찾기
    const oldestStock = await prisma.stock.findFirst({
      where: {
        user_id: userId,
        ingredient_id: ri.ingredient_id
      },
      orderBy: { expiryDate: 'asc' } // 가장 빠른 유통기한부터
    });

    if (oldestStock) {
      // 복잡한 단위 변환 대신, 일단은 재고 항목 하나를 소모 처리하는 방식으로 단순화
      // (만약 실제 수치 기반 차감이 필요하다면 여기서 수량 연산 로직 추가 가능)
      await prisma.stock.delete({
        where: { id: oldestStock.id }
      });
    }
  }
};
