/**
 * ### Retrieves the database structure.
 */
function f_get_db_structure() {
  // users collection:
  const users_collection = "users_col";
  const blogs_collection = "blogs_col";
  const comments_collection = "comments_col";
  const likes_collection = "likes_col";
  const ratings_collection = "ratings_col";
  const tags_collection = "tags_col";
  const categories_collection = "categories_col";

  //
  return {
    /**
     * ```
     * const { users_collection } = f_get_db_structure();
     * ```
     */
    users_collection,

    /**
     * ```
     * const { blogs_collection } = f_get_db_structure();
     * ```
     */
    blogs_collection,

    /**
     * ```
     * const { comments_collection } = f_get_db_structure();
     * ```
     */
    comments_collection,

    /**
     * ```
     * const { likes_collection } = f_get_db_structure();
     * ```
     */
    likes_collection,

    /**
     * ```
     * const { ratings_collection } = f_get_db_structure();
     * ```
     */
    ratings_collection,

    /**
     * ```
     * const { tags_collection } = f_get_db_structure();
     * ```
     */
    tags_collection,

    /**
     * ```
     * const { categories_collection } = f_get_db_structure();
     * ```
     */
    categories_collection,
  };
}

export default f_get_db_structure;
