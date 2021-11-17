import { observer } from "mobx-react-lite";
import React from 'react'
import styled, { keyframes } from "styled-components";
import Users from "./store/user";
import IUsers from './types/User';
import {debounce} from 'lodash';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Rotate = styled.div`
  display: inline-block;
  animation: ${rotate} 0.4s linear infinite;
  padding: 2rem 1rem;
  font-size: 1.2rem;
`;
const TableTd = styled.td`
 border-bottom: 0.5px solid black;
 margin: 10px;
 text-align: center;
`

const TableTr = styled.tr`
height: 30px;


`

const Container = styled.div`
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
`

const BlockTable = styled.div`
    height: 250px;
    width: 1000px;
    justify-content: center;
    display: flex;
    overflow: scroll; 
    padding: 10px;
    background-color: #f1f1f1;
    color: #3a3a3a;
    border: 1px solid black;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`


 const App: React.FC = observer(({}) => {
      const blockRef = React.useRef<HTMLHeadingElement | any>(null)
      React.useEffect(() => {
        Users.fetchNewUsers()
      }, [])
      return(
     <Container>
      <BlockTable onScrollCapture={() => {
          if(blockRef.current?.offsetHeight + blockRef.current?.scrollTop >= blockRef.current?.scrollHeight) {
              Users.fetchNewUsers()
              Users.page = Users.page + 1
          }
      }} ref={blockRef} >
          <table >
              <tr>
                  <th>Имя</th>
                  <th>Почта</th>
                  <th>Пол</th>
                  <th>Статус</th>
              </tr>
              {Users.users && Users.users.map((user : IUsers) =>  {
                  return(
                      <TableTr key={user.id}>
                          <TableTd>{user.name}</TableTd>
                          <TableTd 
                          style={{cursor: 'pointer'}}
                          onMouseEnter={debounce(() => {
                              Users.getPostsUser(user.id)
                          },800)} title={`У пользователя: ${Users.postCount} постов`}>{user.email}</TableTd>
                          <TableTd>{user.gender}</TableTd>
                          <TableTd>{user.status}</TableTd>
                      </TableTr>
              )})}
      {Users.loading && <h1 style={{position: 'absolute', top: "50%", left: 0, transform: "translateY(-50%)"}}><Rotate>LOADING</Rotate></h1>}

          </table>
          
      </BlockTable>

     </Container>
      );
  })

export default App;