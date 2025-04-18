
import Table from "react-bootstrap/Table";

const Match = () => {
  return (
    <div>
      <div style={{ width: "100%", overflowX: "hidden" }}>
        <div style={{ maxWidth: "100%", overflowX: "auto" }}>
          <Table bordered hover>
            <thead>
              <tr>
                <th>Referee</th>
                <th>Round</th>
                <th>Date</th>
                <th>Stade_Name</th>
                <th>Stade_City</th>
                <th>Teams_Home</th>
                <th>Teams_Away</th>
                <th>Status_Long</th>
                <th>Status_Short</th>
                <th>GoalsHome/HalfTime</th>
                <th>GoalsHome/FullTime</th>
                <th>GoalsAway/HalfTime</th>
                <th>GoalsAway/FullTime</th>
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
}

export default Match
