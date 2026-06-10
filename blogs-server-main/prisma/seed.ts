import { PrismaClient } from '@prisma/client';
import { USER } from '../src/interfaces/user';
import { POST } from '../src/interfaces/post';
import POSTS from '../src/constants/posts';
import { encryptData } from '../src/helpers/encryptionHelpers';

// Initializing Prisma client
const prisma = new PrismaClient();

// User data to be added
const userData: USER = {
  name: 'John Doe',
  email: 'johndoe@example.com',
  password: 'KPAfeb24!',
};

// Function to add user and dummy posts
const addUser = async () => {
  // Check if user already exists
  const user = await prisma.user.findUnique({
    where: {
      email: userData.email,
    },
  });
  // If user does not exist, create new user and dummy posts
  if (!user) {
    const encryptedPassword = encryptData(userData.password);
    const userObj = await prisma.user.create({
      data: { ...userData, password: encryptedPassword },
    });
    console.log(`Created new user: ${userObj.email}`);
    // Create dummy posts for the user
    POSTS.forEach(async (postData: POST) => {
      await prisma.post.create({
        data: {
          ...postData,
          authorId: userObj.id,
        },
      });
    });
    console.log(`Created dummy posts`);
  }
};

// Main function to execute seeding
async function main() {
  await addUser();
  console.log(`Seeding finished.`);
}

// Execute main function
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
