/* eslint-disable */
import React, { useState } from 'react';
import './App.css';



function App() {
  let [post, setPosts] = useState(['엄마의 영면','내 생일','출국']);
  let [detail, setDetails] = useState (['내 인생 가장  힘든 시간','엄마가 버텨주기로 한 날, 가장 슬픈 내생일','내가 어머니의 곁을 영원히 떠난 날']);
  let [date, setDates] = useState(['Jan/25/2022','Mar/7/2022','Mar/31/2022']);
  let [thumbsUp, setThumbsUps] = useState(postCount());
  let hiddenPost = ['마지막 숨','기다린 날','엄마 안녕'];
  let [modal, setModals] = useState(false);
  let [newPost, setNewPosts] = useState('');

  let [postNumber, setPostNumber] = useState(0);

  function postCount(){
    var array = [];
    post.map(function(){
      array.push(0);
    })
    return(array);
  }

  function changeThumbsUp(e){
    var newArray = [...thumbsUp];
    newArray[e] += 1;
    setThumbsUps( newArray );
  }

  function changePostsName(e) {
    var newArray = [...post];  
    newArray[e] = hiddenPost[e]
    setPosts( newArray );
  }

  function arrangeArray(){
    var newArray = [...post];
    newArray.sort();
    setPosts(newArray);
  }

  function sendingModal(i){    
    setModals(!modal);
    var postNum = i;
    setPostNumber(postNum)
  }

  function addNewPost(ph) {
    var newArray = [...post];
    newArray.push(ph);
    setPosts(newArray);
  }

  function deletePost(n){
    var newArray = [...post];
    newArray.splice(n, 1);
    console.log("newArray는" + newArray +"n은" + n);
    setPosts(newArray);
  }


  return (
    <div className="App">
      <div className="black-nav">
        <div> BLOG NAV </div>
      </div>
      <button onClick={ arrangeArray }>정렬</button>
      <h1>DIARY</h1>
        {
          post.map(function(a, i){
            return(
            <div className='list' key={i}>
            <button onClick={()=>{
              changePostsName(i);
              }}>                
            </button>
              <h3 onClick={()=>{
                sendingModal(i);
                }}> { a }
              </h3>
              <p> { detail[i] }</p>
              <h4> { date[i] } </h4>

              <span onClick={(e)=>{
                 e.stopPropagation(); changeThumbsUp(i)
                 }}>❤
              </span> { thumbsUp[i] }

              <div>
                <button onClick={()=>{
                   deletePost(i)
                   }}> 삭제 버튼
                </button>
              </div>
              <hr/>
            </div>)
          })
        }

        <input onChange={(e)=>{
           setNewPosts(e.target.value)
           }}>
        </input>
        <button onClick={()=>{
           addNewPost(newPost);
           console.log(post) 
           }}> 글추가
        </button>
        
        {
          modal === true ? 
          <Modal post={post} postNumber={postNumber} changePostsName={changePostsName}></Modal>       
          : null
        }

        

    </div>
  );


}

    function Modal(props){
      return(        
        <div className='modal'>
          <h3> {props.post[props.postNumber]} </h3>
          <button onClick={()=>{props.changePostsName(props.postNumber)}}>글 수정 버튼</button>
        </div>
      )

    }

export default App;
