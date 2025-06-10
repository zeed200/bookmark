import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
  });

export default function Form({ item, onSuccess, onCancel }) {
    const [form, setForm] = useState({ title: '', url: '', note: '' });


    useEffect(() => {
        if (item) {
            setForm(item);
        } else {
            setForm({ title: '', url: '', note: '' });
        }
    }, [item]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (item) {

                const res = await api.put(`api/sources/${item.id}/`, form);
                toast.info("تم التعديل بنجاح!");
                onSuccess(res.data);
            } else {

                const res = await api.post(`api/sources/`, form);
                toast.success("تمت الإضافة بنجاح!");
                onSuccess(res.data);
            }
            setForm({ title: '', url: '', note: '' });
        } catch (err) {
            console.error('خطأ:', err);
            toast.error("حدث خطأ أثناء الإرسال!");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="container w-100 p-5 bg-light rounded-4 mt-3" >
                <div style={{ textAlign: 'center', margin: '10' }}>
                    <h1 className="text-primary"> BookMark </h1>
                </div>

                <div className="form-floating mb-3">
                    <input
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        type="text" required className="form-control" id="floatingInput" placeholder="text" />
                    <label htmlFor="floatingInput" style={{ right: '0', left: '100%', overflow: 'inherit' }} >العنوان</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        name="url"
                        value={form.url}
                        onChange={handleChange} required type="url" className="form-control" id="floatingPassword" placeholder="url" />
                    <label htmlFor="floatingPassword" style={{ right: '0', left: '100%', overflow: 'inherit' }} className="text-end">الرابط</label>
                </div>
                <div className="form-floating mb-3">
                    <textarea
                        name="note"
                        value={form.note}
                        onChange={handleChange} className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{ height: '100px' }}></textarea>
                    <label htmlFor="floatingTextarea2" style={{ right: '0', left: '100%', overflow: 'inherit' }} className="text-end">ملاحظات</label>
                </div>
                <div>
                    <button type="submit" className="btn btn-primary" style={{ float: 'left' }}>
                        {item ? ' تعديل' : 'إضافة'}
                    </button>
                    {item && (
                        <button type="button" className="btn btn-secondary "  onClick={onCancel}>
                            إلغاء
                        </button>
                    )}
                </div>
            </div>
        </form>

    )
}

