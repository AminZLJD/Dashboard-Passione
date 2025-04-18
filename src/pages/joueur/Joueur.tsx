import Table from "react-bootstrap/Table";

const Joueur = () => {
  return (
    <div>
      <div style={{ width: "100%", overflowX: "hidden" }}>
        <div style={{ maxWidth: "100%", overflowX: "auto" }}>
          <Table bordered hover>
            <thead>
              <tr>
                <th>Team_Id</th>
                <th>Team_Code</th>
                <th>Date</th>
                <th>Team_Name</th>
                <th>Team_Logo</th>
                <th>Name</th>
                <th>Age</th>
                <th>Number</th>
                <th>Position</th>
                <th>Logo</th>
                <th>Value</th>
                <th>Value_Passionne</th>
                <th>Height</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Mark</td>
                <td>Otto</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>John</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>John</td>
                <td>Doe</td>
                <td>@johndoe</td>
                <td>@johndoe</td>
              </tr>
              <tr>
                <td>Mark</td>
                <td>Otto</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>John</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>John</td>
                <td>Doe</td>
                <td>@johndoe</td>
                <td>@johndoe</td>
              </tr>
              <tr>
                <td>Mark</td>
                <td>Otto</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>John</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>John</td>
                <td>Doe</td>
                <td>@johndoe</td>
                <td>@johndoe</td>
              </tr>
              <tr>
                <td>Mark</td>
                <td>Otto</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>John</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>John</td>
                <td>Doe</td>
                <td>@johndoe</td>
                <td>@johndoe</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Joueur;
