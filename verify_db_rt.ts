import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Checking DB support for RT storage...");
  
  // 1. 기존 테스트 아이템 확인 또는 생성
  let item = await prisma.item.findFirst({ where: { name: "상온 테스트 품목" } });
  if (!item) {
    item = await prisma.item.create({
      data: {
        name: "상온 테스트 품목",
        category: "ETC"
      }
    });
  }

  // 2. 관리자 유저 확인
  const user = await prisma.user.findFirst({ where: { email: "tester_rt2@example.com" } });
  if (!user) {
    throw new Error("User not found. Run create_test_user.ts first.");
  }

  // 3. RT(상온) 보관 방식으로 인벤토리 추가
  const inventory = await prisma.inventory.create({
    data: {
      user_id: user.user_id,
      item_id: item.id,
      quantity: 77,
      storage: "RT", // 상온
      entryDate: new Date(),
      is_urgent: false
    }
  });

  console.log("Successfully created inventory with RT storage:", inventory);

  // 4. 조회 테스트
  const saved = await prisma.inventory.findUnique({
    where: { id: inventory.id },
    include: { item: true }
  });

  if (saved?.storage === "RT") {
    console.log("✅ Database verification successful: Storage 'RT' is correctly saved and retrieved.");
  } else {
    console.log("❌ Database verification failed.");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
