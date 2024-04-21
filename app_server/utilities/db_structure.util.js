/** ### Retrieves the database structure. */
function f_utl_db_structure() {
  //
  // database collections names:
  const v_users_col = "users_col";
  const v_blogs_col = "blogs_col";
  const v_comments_col = "comments_col";
  const v_likes_col = "likes_col";
  const v_ratings_col = "ratings_col";
  const v_tags_col = "tags_col";
  const v_categories_col = "categories_col";

  //
  return {
    /**
     * ```
     * const { v_users_col } = f_utl_db_structure();
     * ```
     */
    v_users_col,

    /**
     * ```
     * const { v_blogs_col } = f_utl_db_structure();
     * ```
     */
    v_blogs_col,

    /**
     * ```
     * const { v_comments_col } = f_utl_db_structure();
     * ```
     */
    v_comments_col,

    /**
     * ```
     * const { v_likes_col } = f_utl_db_structure();
     * ```
     */
    v_likes_col,

    /**
     * ```
     * const { v_ratings_col } = f_utl_db_structure();
     * ```
     */
    v_ratings_col,

    /**
     * ```
     * const { v_tags_col } = f_utl_db_structure();
     * ```
     */
    v_tags_col,

    /**
     * ```
     * const { v_categories_col } = f_utl_db_structure();
     * ```
     */
    v_categories_col,
  };
}

export default f_utl_db_structure;
