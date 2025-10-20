import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditBookPage = () => {
  const { id } = useParams(); // ดึง id หนังสือจาก URL เช่น /edit-book/3
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  // ดึงข้อมูลหนังสือที่ต้องการแก้ไข
  useEffect(() => {
    const fetchBook = async () => {
      try {
        // ใช้ backtick สำหรับ template literal
        const res = await fetch(`/api/v1/books/${id}`);
        if (!res.ok) throw new Error("Failed to fetch book");
        const data = await res.json();
        setBook(data);
      } catch (err) {
        console.error("Error fetching book:", err);
        alert("ไม่สามารถดึงข้อมูลหนังสือได้");
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  // ฟังก์ชันบันทึกข้อมูลหลังแก้ไข
  const handleSave = async () => {
    try {
      const res = await fetch(`/api/v1/books/${id}`, { // <-- backtick
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book),
      });

      if (!res.ok) throw new Error("Update failed");

      alert("อัปเดตข้อมูลสำเร็จ!");
      navigate("/store-manager/all-book");
    } catch (err) {
      console.error(err);
      alert("เกิดข้อผิดพลาดในการอัปเดต");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!book) return <div>ไม่พบหนังสือ</div>;

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">แก้ไขหนังสือ #{id}</h1>

      <div className="space-y-2">
        <input
          value={book.title || ""}
          onChange={(e) => setBook({ ...book, title: e.target.value })}
          className="border p-2 w-full"
          placeholder="ชื่อหนังสือ"
        />
        <input
          value={book.author || ""}
          onChange={(e) => setBook({ ...book, author: e.target.value })}
          className="border p-2 w-full"
          placeholder="ผู้แต่ง"
        />
        <input
          type="number"
          value={book.price || 0}
          onChange={(e) => setBook({ ...book, price: Number(e.target.value) })}
          className="border p-2 w-full"
          placeholder="ราคา"
        />
        <textarea
          value={book.description || ""}
          onChange={(e) => setBook({ ...book, description: e.target.value })}
          className="border p-2 w-full"
          placeholder="รายละเอียด"
        />
      </div>

      <button
        onClick={handleSave}
        className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
      >
        บันทึกการแก้ไข
      </button>
    </div>
  );
};

export default EditBookPage;
