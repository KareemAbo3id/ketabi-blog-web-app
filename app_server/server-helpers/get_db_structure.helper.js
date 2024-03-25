/**
 * ### Get Database Structure Function
 * get the database structure collection names.
 */
function f_get_db_structure() {
  // users collection:
  const users_collection = "users_col";

  //
  return {
    /**
     * ```
     * const { users_collection } = f_get_db_structure();
     * ```
     */
    users_collection,
  };
}

export default f_get_db_structure;
