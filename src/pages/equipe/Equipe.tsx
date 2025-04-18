import React from "react";
import Table from "react-bootstrap/Table";

const Equipe: React.FC = () => {
  return (
    <div style={{ width: "100%", overflowX: "hidden" }}>
      <div style={{ maxWidth: "100%", overflowX: "auto" }}>
        <Table bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Code</th>
              <th>Country</th>
              <th>City</th>
              <th>Founded</th>
              <th>Logo</th>
              <th>Group</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>John</td>
              <td>Doe</td>
              <td>@johndoe</td>
              <td>@johndoe</td>
            </tr>
            <tr>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
              <td>Jane</td>
              <td>Smith</td>
              <td>@janesmith</td>
              <td>@johndoe</td>
            </tr>
            <tr>
              <td>Larry the Bird</td>
              <td>@twitter</td>
              <td>Mike</td>
              <td>Johnson</td>
              <td>@michaeljohnson</td>
              <td>@sarahlee</td>
              <td>@johndoe</td>
            </tr>
            <tr>
              <td>Emily</td>
              <td>Clark</td>
              <td>@emilyclark</td>
              <td>Sarah</td>
              <td>Lee</td>
              <td>@johndoe</td>
              <td>@sarahlee</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Equipe;
