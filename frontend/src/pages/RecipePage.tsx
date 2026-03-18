import React, { useState, useEffect } from 'react';
import { getRecipes, deleteRecipe, createRecipe, updateRecipe, getRecipeById, getRecommendations, cookRecipe } from '../api/recipes';
import { getIngredients } from '../api/ingredients';
import type { Recipe, RecipeWithIngredients } from '../types/recipe';
import type { Ingredient } from '../types/ingredient';
import RecipeModal from '../components/recipes/RecipeModal';
import RecipeDetailModal from '../components/recipes/RecipeDetailModal';
import { 
  PlusIcon, 
  TrashIcon, 
  PencilSquareIcon,
  ClockIcon,
  ChartBarIcon,
  MagnifyingGlassIcon,
  SparklesIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

import { motion } from 'framer-motion';

const RecipePage: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [recommendations, setRecommendations] = useState<(RecipeWithIngredients & { score: number })[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  
  // Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<RecipeWithIngredients | undefined>(undefined);
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeWithIngredients | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [recipeData, ingredientData, recommendData] = await Promise.all([
        getRecipes(),
        getIngredients(),
        getRecommendations()
      ]);
      setRecipes(recipeData);
      setIngredients(ingredientData);
      setRecommendations(recommendData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingRecipe(undefined);
    setIsModalOpen(true);
  };

  const handleOpenEdit = async (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    try {
      const detail = await getRecipeById(id);
      setEditingRecipe(detail);
      setIsModalOpen(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleOpenDetail = async (id: number) => {
    try {
      const detail = await getRecipeById(id);
      setSelectedRecipe(detail);
      setIsDetailOpen(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async (data: any) => {
    try {
      if (editingRecipe) {
        await updateRecipe(editingRecipe.id, data);
      } else {
        await createRecipe(data);
      }
      setIsModalOpen(false);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    if (!window.confirm('이 레시피를 삭제하시겠습니까?')) return;
    try {
      await deleteRecipe(id);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCook = async (id: number) => {
    try {
      await cookRecipe(id);
      alert('요리가 완료되었습니다! 식재료가 재고에서 차감되었습니다.');
      setIsDetailOpen(false);
      fetchData();
    } catch (err) {
      console.error(err);
      alert('재료 차감 중 오류가 발생했습니다.');
    }
  };

  const filteredRecipes = recipes.filter(r => 
    r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="p-6 max-w-7xl mx-auto space-y-8"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">요리 레시피 관리</h1>
          <p className="text-gray-500 font-medium">나만의 레시피를 등록하고 보유 식재료와 연동하세요.</p>
        </div>
        <button 
          onClick={handleOpenAdd}
          className="flex items-center gap-2 bg-brand-600 text-white px-6 py-4 rounded-2xl font-bold hover:bg-brand-700 hover:shadow-lg hover:shadow-brand-200 transition-all active:scale-95 group"
        >
          <PlusIcon className="w-5 h-5 transition-transform group-hover:rotate-90" />
          신규 레시피 등록
        </button>
      </div>

      {/* 추천 레시피 섹션 */}
      {!loading && recommendations.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <SparklesIcon className="w-6 h-6 text-brand-500" />
            <h2 className="text-2xl font-bold text-gray-900">오늘의 추천 요리</h2>
            <span className="text-sm text-gray-400 font-medium ml-2">보유하신 식재료를 활용할 수 있는 메뉴입니다.</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.slice(0, 3).map(recipe => (
              <div 
                key={`rec-${recipe.id}`} 
                onClick={() => handleOpenDetail(recipe.id)}
                className="premium-card p-6 space-y-4 bg-brand-50/30 border-brand-100/50 group hover:-translate-y-2 transition-all cursor-pointer"
              >
                <div className="flex justify-between items-start">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black text-brand-600 uppercase tracking-widest">Recommendation</span>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black w-fit ${
                      recipe.difficulty === 'EASY' ? 'bg-emerald-100 text-emerald-700' :
                      recipe.difficulty === 'MEDIUM' ? 'bg-orange-100 text-orange-700' :
                      'bg-rose-100 text-rose-700'
                    }`}>
                      {recipe.difficulty === 'EASY' ? '쉬움' : recipe.difficulty === 'MEDIUM' ? '보통' : '어려움'}
                    </span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-2xl font-black text-brand-600">{Math.round((recipe.score || 0) * 100)}%</span>
                    <span className="text-[10px] text-brand-400 font-bold">매칭률</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-black text-gray-900 line-clamp-1">{recipe.title}</h3>
                  <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">
                    {recipe.description || '작성된 설명이 없습니다.'}
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-2 border-t border-brand-100/50">
                  <div className="flex items-center gap-1.5 text-brand-400">
                    <ClockIcon className="w-4 h-4" />
                    <span className="text-xs font-bold">{recipe.cookingTime || 0}분</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-brand-400">
                    <ChartBarIcon className="w-4 h-4" />
                    <span className="text-xs font-bold">재료 {recipe.ingredients?.length || 0}개</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="relative group">
        <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-brand-500 transition-colors" />
        <input 
          type="text"
          placeholder="레시피 제목 또는 설명으로 검색..."
          className="w-full pl-12 pr-6 py-4 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 shadow-sm transition-all font-medium"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3].map(i => (
            <div key={i} className="h-64 bg-gray-100 animate-pulse rounded-[2rem]" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map(recipe => (
            <div 
              key={recipe.id} 
              onClick={() => handleOpenDetail(recipe.id)}
              className="premium-card p-6 space-y-4 group hover:-translate-y-2 transition-all cursor-pointer"
            >
              <div className="flex justify-between items-start">
                <span className={`px-3 py-1 rounded-full text-[10px] font-black ${
                  recipe.difficulty === 'EASY' ? 'bg-emerald-100 text-emerald-700' :
                  recipe.difficulty === 'MEDIUM' ? 'bg-orange-100 text-orange-700' :
                  'bg-rose-100 text-rose-700'
                }`}>
                  {recipe.difficulty === 'EASY' ? '쉬움' : recipe.difficulty === 'MEDIUM' ? '보통' : '어려움'}
                </span>
                <div className="flex gap-2">
                  <button 
                    onClick={(e) => handleOpenEdit(e, recipe.id)}
                    className="p-2 bg-gray-50 rounded-xl text-gray-400 hover:text-brand-600 hover:bg-white hover:shadow-md transition-all opacity-0 group-hover:opacity-100"
                  >
                    <PencilSquareIcon className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={(e) => handleDelete(e, recipe.id)}
                    className="p-2 bg-gray-50 rounded-xl text-gray-400 hover:text-rose-500 hover:bg-white hover:shadow-md transition-all opacity-0 group-hover:opacity-100"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-black text-gray-900 line-clamp-1">{recipe.title}</h3>
                <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">
                  {recipe.description || '작성된 설명이 없습니다.'}
                </p>
              </div>

              <div className="flex items-center gap-4 pt-2 border-t border-gray-50">
                <div className="flex items-center gap-1.5 text-gray-400 font-bold">
                  <ClockIcon className="w-4 h-4" />
                  <span className="text-xs">{recipe.cookingTime || 0}분</span>
                </div>
                <div className="flex items-center gap-1.5 ml-auto text-brand-600 font-bold group-hover:translate-x-1 transition-transform">
                  <span className="text-xs">상세보기</span>
                  <EyeIcon className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
          
          {filteredRecipes.length === 0 && (
            <div className="col-span-full py-20 bg-white rounded-[2rem] border border-dashed border-gray-200 flex flex-col items-center justify-center space-y-4">
              <div className="p-4 bg-gray-50 rounded-full text-gray-300">
                <PlusIcon className="w-12 h-12" />
              </div>
              <p className="text-gray-400 font-bold text-lg">아직 등록된 레시피가 없습니다.</p>
            </div>
          )}
        </div>
      )}

      <RecipeModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        ingredients={ingredients}
        initialData={editingRecipe}
      />

      <RecipeDetailModal 
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        recipe={selectedRecipe}
        userIngredients={ingredients}
        onCook={handleCook}
      />
    </motion.div>
  );
};

export default RecipePage;
