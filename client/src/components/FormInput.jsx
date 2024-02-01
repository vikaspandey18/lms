const FormInput = ({ type, name, placeholder }) => {
  return (
    <>
      <div class="col-md-12">
        <input
          type={type}
          name={name}
          class="form-control"
          placeholder={placeholder}
          required
        />
      </div>
    </>
  );
};
export default FormInput;
