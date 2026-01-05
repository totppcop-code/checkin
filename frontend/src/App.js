import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [checkins, setCheckins] = useState([]);
  const [users, setUsers] = useState([]);       // 使用者清單
  const [currentUser, setCurrentUser] = useState(""); // 當前選擇的使用者
  const [newUser, setNewUser] = useState("");   // 新使用者輸入框

  // 取得打卡紀錄
  const fetchCheckins = async () => {
    try {
      const res = await axios.get("http://api.localhost/api/checkin/");
      setCheckins(res.data);

      // 自動更新使用者清單
      const uniqueUsers = [...new Set(res.data.map(c => c.user))];
      setUsers(uniqueUsers);
    } catch (err) {
      console.error("Error fetching checkins:", err);
    }
  };

  // 新增打卡
  const addCheckin = async (type) => {
    const user = currentUser || newUser;
    if (!user) {
      alert("請先輸入或選擇使用者！");
      return;
    }

    try {
      await axios.post("http://api.localhost/api/checkin/", {
        user: user,
        type: type,
      });
      fetchCheckins();
      setNewUser(""); // 清空輸入框
    } catch (err) {
      console.error("Error adding checkin:", err);
    }
  };

  useEffect(() => {
    fetchCheckins();
  }, []);

  const typeMap = { in: "上班", out: "下班" };

  return (
    <div style={{ padding: "20px" }}>
      <h1>打卡系統</h1>

      {/* 第一次輸入使用者 */}
      {users.length === 0 ? (
        <div>
          <input
            type="text"
            placeholder="輸入使用者名稱"
            value={newUser}
            onChange={(e) => setNewUser(e.target.value)}
          />
        </div>
      ) : (
        <div>
          <select
            value={currentUser}
            onChange={(e) => setCurrentUser(e.target.value)}
          >
            <option value="">選擇使用者</option>
            {users.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="新增使用者"
            value={newUser}
            onChange={(e) => setNewUser(e.target.value)}
          />
        </div>
      )}

      <button onClick={() => addCheckin("in")}>上班打卡</button>
      <button onClick={() => addCheckin("out")}>下班打卡</button>

      <h2>打卡紀錄</h2>
      <ul>
        {checkins.map((c) => (
          <li key={c.id}>
            {c.user} - {typeMap[c.type]} @ {new Date(c.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
