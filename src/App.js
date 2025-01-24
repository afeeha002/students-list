import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./App.css";

const App = () => {
  const [students, setStudents] = useState([]);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    setStudents([...students, data]);
    reset();
    handleCloseModal();
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="App">
      <div className="app">
        <div className="student-list-card">
          <h2>Student-list</h2>
          <button className="btn btn-success" onClick={handleOpenModal}>Add Student</button>
          <h3>List of Students</h3>
          {students.length === 0 ? (
            <p>No Students added yet.</p>
          ) : (
            <ul className="list-group mt-3">
              {students.map((student, index) => (
                <li key={index} className="list-group-item">
                  {student.name}, Age: {student.age}, Class: {student.class}
                </li>
              ))}
            </ul>
          )}
        </div>
        {isModalOpen && (
          <div className="modal show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title d-flex">Add Student</h5>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={handleCloseModal}
                  ></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group row mb-3">
                      <label className="col-sm-3 col-form-label text-start">Name</label>
                      <div className="col-sm-9">
                        <input
                          {...register("name", {
                            required: "Name is required",
                            pattern: {
                              value: /^[A-Za-z]+$/,
                              message: "Only letters are allowed in the name",
                            },
                          })}
                          type="text"
                          className="form-control"
                        />
                        {errors.name && (
                          <div className="text-danger">{errors.name.message}</div>
                        )}
                      </div>
                    </div>

                    <div className="form-group row mb-3">
                      <label className="col-sm-3 col-form-label text-start">Age</label>
                      <div className="col-sm-9">
                        <input
                          {...register("age", {
                            required: "Age is required",
                            min: { value: 1, message: "Age must be at least 1" },
                          })}
                          type="number"
                          className="form-control"
                        />
                        {errors.age && (
                          <div className="text-danger">{errors.age.message}</div>
                        )}
                      </div>
                    </div>

                    <div className="form-group row mb-3">
                      <label className="col-sm-3 col-form-label text-start">Class</label>
                      <div className="col-sm-9">
                        <input
                          {...register("class", {
                            required: "Class is required"
                          })}
                          type="text"
                          className="form-control"
                        />
                        {errors.class && (
                          <div className="text-danger">{errors.class.message}</div>
                        )}
                      </div>
                    </div>

                    <div className="text-end">
                      <button type="submit" className="btn btn-primary">
                        Add Student
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
