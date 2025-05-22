import { useState } from "react";
import "./App.css";


function App() {
  const [todoList, setTodoList] = useState([
    { id: 0, content: "123", completed: false },
    { id: 1, content: "코딩 공부하기", completed: false },
    { id: 2, content: "잠 자기", completed: false },
  ]);

  return (
    <>
      <header className="app-header">OZ-TodoList</header>
      <TodoList todoList={todoList} setTodoList={setTodoList} />
      <hr />
      <TodoInput todoList={todoList} setTodoList={setTodoList} />
    </>
  );
}

function TodoInput({ todoList, setTodoList }) {
  const [inputValue, setInputValue] = useState("");

  return (
    <>
      <input
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />
      <button
        onClick={() => {
          if (inputValue. trim() === "") return;
          const newTodo = { id: Number(new Date()), content: inputValue, completed: false };
          const newTodoList = [...todoList, newTodo];
          setTodoList(newTodoList);
          setInputValue("");
        }}
        >
        추가하기
      </button>
    </>
  );
}

function TodoList({ todoList, setTodoList }) {
  return (
    <ul>
      {todoList.map((todo) => (
        <Todo key={todo.id} todo={todo} setTodoList={setTodoList} />
      ))}
    </ul>
  );
}

function Todo({ todo, setTodoList }) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(todo.content);
  return (
    <li className="todo-item">
      <input 
      type="checkbox"
      checked={todo.completed}
        onChange={() => 
          setTodoList((prev) =>
            prev.map((el) =>
              el.id === todo.id ? { ...el, completed : !el.completed } : el
            )
         )
        }
      />
    {isEditing ? (
      <>
        <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        />
        <button
        onClick={()=> {
          setTodoList((prev) => 
            prev.map((el) => 
              el.id === todo.id ? { ...el, content: inputValue } : el
        )
      );
      setIsEditing(false);
      }}
      >
        저장
      </button>
      <button onClick={() => setIsEditing(false)}>취소</button>

      </>
    ) : (
      <>
      <span className={`todo-content ${todo.completed ? "completed" : ""}`}>
        {todo.content}
      </span>
      <button onClick={() => setIsEditing(true)}>수정</button>
      <button onClick={() => {
        setTodoList((prev) => prev.filter((el) => el.id !== todo.id));
      }}
      >삭제
      </button>        
      </>
    )}
    </li>
  );
}

export default App;


//* 개별학습 
//* 넣고싶은 기능들 챗gpt를 통해서 넣어보고 코드 설명 공부함
//* 각 할일 content 순서표시, content뒤에 시작시간 끝시간표시 뒤에 완료 체크박스 만들기
//* 순서가 시작 시간 기준으로 자동으로 정렬
//* 각 수정 버튼을 없애고 하나의 수정버튼으로 만듬
//* 수정버튼 클릭시 content내용,시작시간,끝시간,완료 체크박스표시 
//* 적용버튼 클릭시 적용, 전체적용 버튼 클릭시 전체 적용
//* 삭제 버튼은 언제든 활용가능
//* input 에 할일적고 추가하기 누르면 content 추가
//* 공백시 input추가 안됨. / 기존 텍스트외 숫자 수정-체크박스-체크-수정완료시 적용안되는거 수정
//? 더 추가 해보고 싶은 기능
//? 헤더 밑에 현재 시간 표시
//? 헤더 밑에 달력 표시 
//? 달력안에 각 날짜별로 실행한 TodoList 남겨놓기
//? 지나간 날짜는 흐릿하게 표시 (혹은 지나간날 아직인날 색 다르게 표시)
//? 실시간 기준으로 완료 미완료 자동으로 체크 되기
//? CSS 디자인 꾸미기


// import { useState, useEffect } from "react";
// import "./App.css";

// function App() {
//   const [todoList, setTodoList] = useState([
//     {
//       id: 0,
//       content: "123",
//       startTime: "08:00",
//       endTime: "09:00",
//       completed: false,
//     },
//     {
//       id: 1,
//       content: "코딩 공부하기",
//       startTime: "09:00",
//       endTime: "11:00",
//       completed: true,
//     },
//   ]);
//   const [isEditMode, setIsEditMode] = useState(false);

//   return (
//     <>
//       <header
//         style={{
//           textAlign: "center",
//           padding: "1rem",
//           fontSize: "1.8rem",
//           fontWeight: "bold",
//         }}
//       >
//         OZ-TodoList
//       </header>
//       <TodoList
//         todoList={todoList}
//         setTodoList={setTodoList}
//         isEditMode={isEditMode}
//       />
//       <hr />
//       <TodoInput
//         todoList={todoList}
//         setTodoList={setTodoList}
//         isEditMode={isEditMode}
//         setIsEditMode={setIsEditMode}
//       />
//     </>
//   );
// }

// function TodoInput({ todoList, setTodoList, isEditMode, setIsEditMode }) {
//   const [inputValue, setInputValue] = useState("");

//   const addTodo = () => {
//     if (inputValue.trim() === "") return;
//     const newTodo = {
//       id: Date.now(),
//       content: String(inputValue),
//       startTime: "",
//       endTime: "",
//       completed: false,
//     };
//     setTodoList([...todoList, newTodo]);
//     setInputValue("");
//   };

//   return (
//     <>
//       <input
//         value={inputValue}
//         onChange={(e) => setInputValue(e.target.value)}
//         placeholder="할 일 입력"
//       />
//       <button onClick={addTodo}>추가하기</button>
//       <button onClick={() => setIsEditMode(!isEditMode)}>
//         {isEditMode ? "수정 종료" : "수정"}
//       </button>
//     </>
//   );
// }

// function TodoList({ todoList, setTodoList, isEditMode }) {
//   // editData: 로컬 수정값 상태 (todoList 초기값으로 세팅)
//   const [editData, setEditData] = useState(
//     todoList.map((todo) => ({
//       id: todo.id,
//       content: todo.content,
//       startTime: todo.startTime || "",
//       endTime: todo.endTime || "",
//       completed: todo.completed || false,
//     }))
//   );

//   // todoList가 바뀌면 editData 동기화
//   useEffect(() => {
//     setEditData(
//       todoList.map((todo) => ({
//         id: todo.id,
//         content: todo.content,
//         startTime: todo.startTime || "",
//         endTime: todo.endTime || "",
//         completed: todo.completed || false,
//       }))
//     );
//   }, [todoList]);

//   // 개별 항목의 수정 값 업데이트 함수
//   const updateEditItem = (id, field, value) => {
//     setEditData((prev) =>
//       prev.map((item) =>
//         item.id === id ? { ...item, [field]: value } : item
//       )
//     );
//   };

//   // 개별 적용 버튼 - 특정 항목만 todoList에 반영
//   const applySingleChange = (id) => {
//     const itemToUpdate = editData.find((item) => item.id === id);
//     if (!itemToUpdate) return;

//     // 기존 todoList에서 id제외한 나머지 + 업데이트 아이템 추가 후 정렬
//     const filtered = todoList.filter((t) => t.id !== id);
//     filtered.push(itemToUpdate);

//     filtered.sort((a, b) => {
//       if (!a.startTime) return 1;
//       if (!b.startTime) return -1;
//       return a.startTime.localeCompare(b.startTime);
//     });

//     setTodoList(filtered);
//   };

//   // 전체 적용 버튼 - 모든 editData 한꺼번에 반영
//   const applyAllChanges = () => {
//     const sorted = [...editData].sort((a, b) => {
//       if (!a.startTime) return 1;
//       if (!b.startTime) return -1;
//       return a.startTime.localeCompare(b.startTime);
//     });
//     setTodoList(sorted);
//   };

//   // 삭제 함수 - todoList에서 바로 삭제
//   const handleDelete = (id) => {
//     setTodoList((prev) => prev.filter((todo) => todo.id !== id));
//   };

//   return (
//     <>
//       <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
//         {editData.map((todo, index) => (
//           <li key={todo.id} style={{ marginBottom: "1rem" }}>
//             {!isEditMode ? (
//               <>
//                 <span
//                   style={{
//                     textDecoration: todo.completed ? "line-through" : "none",
//                     marginRight: "1rem",
//                   }}
//                 >
//                   {index + 1}. {todo.content} | 🕒 {todo.startTime} ~ {todo.endTime} |{" "}
//                   <input
//                     type="checkbox"
//                     checked={todo.completed}
//                     readOnly
//                     style={{ pointerEvents: "none" }}
//                   />{" "}
//                   {todo.completed ? "완료됨" : "미완료"}
//                 </span>
//                 <button onClick={() => handleDelete(todo.id)}>삭제</button>
//               </>
//             ) : (
//               <>
//                 <input
//                   value={todo.content}
//                   onChange={(e) =>
//                     updateEditItem(todo.id, "content", e.target.value)
//                   }
//                   placeholder="내용"
//                 />
//                 <input
//                   type="time"
//                   value={todo.startTime}
//                   onChange={(e) =>
//                     updateEditItem(todo.id, "startTime", e.target.value)
//                   }
//                   style={{ marginLeft: "0.5rem" }}
//                 />
//                 <input
//                   type="time"
//                   value={todo.endTime}
//                   onChange={(e) =>
//                     updateEditItem(todo.id, "endTime", e.target.value)
//                   }
//                   style={{ marginLeft: "0.5rem" }}
//                 />
//                 <input
//                   type="checkbox"
//                   checked={todo.completed}
//                   onChange={(e) =>
//                     updateEditItem(todo.id, "completed", e.target.checked)
//                   }
//                   style={{ marginLeft: "0.5rem" }}
//                 />
//                 <button
//                   onClick={() => applySingleChange(todo.id)}
//                   style={{ marginLeft: "0.5rem" }}
//                 >
//                   적용
//                 </button>
//                 <button
//                   onClick={() => handleDelete(todo.id)}
//                   style={{ marginLeft: "0.5rem" }}
//                 >
//                   삭제
//                 </button>
//               </>
//             )}
//           </li>
//         ))}
//       </ul>

//       {isEditMode && (
//         <div style={{ textAlign: "center", marginTop: "1rem" }}>
//           <button onClick={applyAllChanges}>전체 적용</button>
//         </div>
//       )}
//     </>
//   );
// }

// export default App;
