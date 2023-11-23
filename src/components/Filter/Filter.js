export const Filter = ({ onChange}) => {
  return (
    <>
      <form>
        <label htmlFor="filter">Find Contacts By Name</label>
        <input onChange={onChange} type="text" name="filter" />
      </form>
    </>
  );
};
