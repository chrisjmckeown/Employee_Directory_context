import React, { useContext } from "react";
import "./style.css";
import ResultsContext from "../utils/ResultsContext";

function MemberList() {
  const { results } = useContext(ResultsContext);
  return (
    <div className='container'>
      <div className='table-responsive'>
        <table className='table table-bordered table-hover'>
          <thead className='thead-light'>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>First</th>
              <th scope='col'>Last</th>
              <th scope='col'>Email</th>
              <th scope='col'>Gender</th>
              <th scope='col'>Picture</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr key={index}>
                <th scope='row'>{index}</th>
                <td>{result.name.first}</td>
                <td>{result.name.last}</td>
                <td>{result.email}</td>
                <td>{result.gender}</td>
                <td>
                  <img
                    alt='Member'
                    src={result.picture.medium}
                    className='img-fluid'
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MemberList;
