// services/userService.js

export async function fetchUserProfile(userId) {
  try {
    const response = await useFetch(`/api/prisma/get-user/${userId}`);
    if (response.error.value) {
      throw new Error(
        response.error.value.message || "Failed to fetch user data."
      );
    }
    return response.data.value; // return the profile data
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch user data.");
  }
}
