import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from './Form';
import { toast } from 'react-toastify';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
  });


export default function GridData() {
    const [search, setSearch] = useState('');
    const [getdata, setgetData] = useState([]);
    const [editingItem, setEditingItem] = useState(null);

    useEffect(() => {
        api.get('api/sources/').then((res) => setgetData(res.data))
        .catch(err => console.error("خطأ في جلب البيانات:", err));
        console.log(getdata);
        
    }, []);

    const handleSuccess = (item) => {
        setEditingItem(null);

        setgetData((prevData) => {
            const index = prevData.findIndex((i) => i.id === item.id);
            if (index !== -1) {
                const updated = [...prevData];
                updated[index] = item;
                return updated;
            } else {
                return [...prevData, item];
            }
        });
    };

    const handleDelete = async (id) => {
        await api.delete(`api/sources/${id}/`);
        setgetData((prev) => prev.filter((item) => item.id !== id));
        toast.warn("تم الحذف بنجاح!");
    };



    const filteredData = (getdata || []).filter(
        (item) =>
            item.title.toLowerCase().includes(search.toLowerCase()) ||
            item.url.toLowerCase().includes(search.toLowerCase()) ||
            item.note.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
        <Form item={editingItem} onSuccess={handleSuccess} onCancel={() => setEditingItem(null)} />
        <div className="container mt-4" dir="rtl">
            <h3 className="text-end mb-4">قائمة الروابط</h3>

            <input
                type="text"
                className="form-control mb-3 text-end"
                placeholder="بحث..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <div className="table-responsive">
                <table className="table table-bordered table-hover align-middle">
                    <thead className="table-light">
                        <tr className="text-end">
                            <th style={{ maxWidth: '150px' }} className="text-break">العنوان</th>
                            <th style={{ maxWidth: '200px' }} className="text-break">الرابط</th>
                            <th style={{ maxWidth: '250px' }} className="text-break">الملاحظات</th>
                            <th>الإجراءات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.length > 0 ? (
                            filteredData.map((item) => (
                                <tr key={item.id} className="text-end">
                                    <td style={{ maxWidth: '150px' }} className="text-break">{item.title}</td>
                                    <td style={{ maxWidth: '200px' }} className="text-break">
                                        <a href={item.url} target="_blank" rel="noreferrer">
                                            {item.url}
                                        </a>
                                    </td>
                                    <td style={{ maxWidth: '250px' }} className="text-break">{item.note}</td>
                                    <td>
                                        <button className="btn btn-sm btn-primary m-2" onClick={() => setEditingItem(item)}>
                                            تعديل
                                        </button>
                                        <button className="btn btn-sm btn-danger m-2" onClick={() => handleDelete(item.id)}>
                                            حذف
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center py-3">
                                    لا توجد نتائج مطابقة
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
        </>
    );
}
