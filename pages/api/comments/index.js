// import fs from "fs/promises";
// import path from "path";

// export const commentPath = () => {
//   return path.join(process.cwd(), "data", "comment.json");
// };

// export const extractComment = async (filePath) => {
//   const fileData = await fs.readFile(filePath);
//   const data = JSON.parse(fileData);
//   return data;
// };

// export const addComment = async (filePath, data) => {
//   return await fs.writeFile(filePath, JSON.stringify(data));
// };


export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
