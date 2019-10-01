import React, { Component, useState } from 'react';
import Axios from 'axios';
import { Button, Table, Pagination } from 'react-materialize';

function App() {
  const [data, setData] = useState(() =>{
    getConts(1);

    return [
      {
        totalCount: 0,
        schoolName: '',
        adres: '',
        campusName: '',
        estType: '',
        link: '',
        region: '',
        schoolGubun: '',
        schoolType: ''
      }
    ]
  });

  function getConts(page){
    Axios.get('//www.career.go.kr/cnet/openapi/getOpenApi.json', {
      params: {
        apiKey: '',
        svcType: 'api',
        svcCode: 'SCHOOL',
        contentType: 'Json',
        gubun: 'univ_list',
        perPage: 10,
        thisPage: page
      }
    }).then(function(response){
      setData(response.data.dataSearch.content);
    });
  }

  const row = data.map((d, i) =>
    <tr key={i}>
      <td>
        <a href={(d.link!='null') ? d.link : '#'} target="_blank">{d.schoolName}</a>
      </td>
      <td>{d.adres}</td>
      <td>{d.campusName}</td>
      <td>{d.estType}</td>
      <td>{d.region}</td>
      <td>{d.schoolGubun}</td>
      <td>{d.schoolType}</td>
    </tr>
  );

  return (
    <div>
      <div id="conts">
        {/* <Button onClick={() => getConts(0)}>call</Button> */}

        전체 검색 결과 수: {data[0].totalCount}

        <Table>
          <thead>
            <tr>
              <th>이름</th>
              <th>주소</th>
              <th>캠퍼스</th>
              <th>국/사립</th>
              <th>지역</th>
              <th>구분</th>
              <th>타입</th>
            </tr>
          </thead>

          <tbody>
            {row}
          </tbody>
        </Table>

        <Pagination
          items={parseInt(data[0].totalCount) / 10}
          maxButtons={10}
          onSelect={(i) => getConts(i)} />
      </div>
    </div>
  );
}

export default App;
