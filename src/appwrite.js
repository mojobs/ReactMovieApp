import { Client, Databases, Query, ID } from "appwrite";

const PROJECT = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

const client = new Client();
client.setEndpoint("https://cloud.appwrite.io/v1");
client.setProject(PROJECT);
const database = new Databases(client);
export const UpdateCount = async (searchTerm, movie) => {
  // Use Appwrite SDK to check if the search term exists in the database
  try {
    const result = await database.listDocuments(DATABASE, COLLECTION, [
      Query.equal("searchTerm", searchTerm),
    ]);
    if (result.documents.length > 0) {
      const doc = result.documents[0];

      await database.updateDocument(DATABASE, COLLECTION, doc.$id, {
        count : doc.count + 1,
      } )
    }
    else{
        await database.createDocument(DATABASE, COLLECTION, ID.unique(), {
            searchTerm,
            count : 1,
            movie_id : movie.id,
            poster_url : `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        })
    }
  } catch (error) {
    console.error(error);
  }
};


export const getTrendingMovies = async () => {
    try {
        const result = await database.listDocuments(DATABASE, COLLECTION,[
            Query.limit(5),
            Query.orderDesc("count")
        ])
        return result.documents;
    } catch (error) {
        console.error(error)
    }
}