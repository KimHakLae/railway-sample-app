const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding core data...');

  // 1. Ingredients
  const ingredients = [
    { name: '양파', category: 'VEG' },
    { name: '대파', category: 'VEG' },
    { name: '마늘', category: 'VEG' },
    { name: '감자', category: 'VEG' },
    { name: '당근', category: 'VEG' },
    { name: '달걀', category: 'DAIRY' },
    { name: '우유', category: 'DAIRY' },
    { name: '돼지고기', category: 'MEAT' },
    { name: '소고기', category: 'MEAT' },
    { name: '닭고기', category: 'MEAT' },
    { name: '김치', category: 'FOOD' },
    { name: '간장', category: 'SPICE' },
    { name: '설탕', category: 'SPICE' },
    { name: '참기름', category: 'SPICE' },
    { name: '고추장', category: 'SPICE' },
  ];

  for (const item of ingredients) {
    await prisma.ingredient.upsert({
      where: { id: 0 }, // Dummy where for upsert without unique name
      update: {},
      create: item,
    });
  }
  
  // Re-fetch to get IDs
  const dbIngredients = await prisma.ingredient.findMany();
  const getIngId = (name) => dbIngredients.find(i => i.name === name)?.id;

  // 2. Sample Recipes (for test@test.com)
  const user = await prisma.user.findUnique({ where: { email: 'test@test.com' } });
  if (user) {
    const recipes = [
      {
        user_id: user.user_id,
        title: '초간단 김치볶음밥',
        description: '누구나 쉽게 만드는 국민 메뉴 김치볶음밥입니다.',
        instructions: '1. 김치를 잘게 썹니다.\n2. 팬에 기름을 두르고 김치를 볶습니다.\n3. 밥을 넣고 잘 섞으며 볶습니다.\n4. 참기름을 두르고 마무리합니다.',
        difficulty: 2,
        cookTime: 15,
        ingredients: {
          create: [
            { ingredient_id: getIngId('김치'), amount: '1공기' },
            { ingredient_id: getIngId('참기름'), amount: '1큰술' },
            { ingredient_id: getIngId('돼지고기'), amount: '100g' },
          ]
        }
      },
      {
        user_id: user.user_id,
        title: '달걀 프라이',
        description: '가장 기초적이면서도 맛있는 달걀 요리입니다.',
        instructions: '1. 팬을 달구고 기름을 두릅니다.\n2. 달걀을 깨트려 넣습니다.\n3. 원하는 익힘 정도까지 익힙니다.',
        difficulty: 1,
        cookTime: 5,
        ingredients: {
          create: [
            { ingredient_id: getIngId('달걀'), amount: '2개' },
          ]
        }
      }
    ];

    for (const recipe of recipes) {
      await prisma.recipe.create({ data: recipe });
    }
    console.log('Sample recipes created for test@test.com');
  }

  console.log('Seeding finished.');
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
