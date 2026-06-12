import { Copy, Sparkles } from "lucide-react";
import { DEPARTMENTS } from "./enum/departments-enum";
import { EMPLOYMENT_TYPES } from "./enum/employment-types-enum";
import { EXPERIENCE_LEVELS } from "./enum/experience-levels-enum";
import { LOCATIONS } from "./enum/locations-enum";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased">
      {/* HEADER */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 px-6 py-4 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-600 rounded-xl text-white">
            <Sparkles size={20} />
          </div>
          <div>
            <h1 className="text-md font-bold tracking-tight">
              AI Job Description Generator
            </h1>
          </div>
        </div>
      </header>

      {/* CORE WORKSPACE - SPLIT SCREEN ARCHITECTURE */}
      <main className="flex-1 grid grid-cols-1 xl:grid-cols-2 max-w-400 w-full mx-auto p-4 lg:p-6 gap-6 items-start">
        {/* LEFT PANEL: INPUT INPUT FORM */}
        <section className="bg-white border border-slate-200 rounded-2xl p-5 lg:p-6 shadow-xs flex flex-col gap-5 sticky xl:top-22 max-h-[calc(100vh-120px)] overflow-y-auto">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
              Recruitment Information
            </h2>
          </div>

          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Job Title */}
              <div className="flex flex-col md:col-span-2">
                <label className="form-label">Job Title</label>
                <input
                  type="text"
                  placeholder="e.g., Backend Developer"
                  className="form-control"
                  required
                />
              </div>

              {/* Company Name */}
              <div className="flex flex-col">
                <label className="form-label">Company Name</label>
                <input
                  type="text"
                  placeholder="e.g., ABC Software"
                  className="form-control"
                  required
                />
              </div>

              {/* Employment Type */}
              <div className="flex flex-col">
                <label className="form-label">Employment Type</label>
                <select className="form-control">
                  {EMPLOYMENT_TYPES.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location */}
              <div className="flex flex-col">
                <label className="form-label">Work Location</label>
                <select className="form-control">
                  {LOCATIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Department */}
              <div className="flex flex-col">
                <label className="form-label">Department</label>
                <select className="form-control">
                  {DEPARTMENTS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Experience Level */}
              <div className="flex flex-col md:col-span-2">
                <label className="form-label">Required Experience Level</label>
                <select className="form-control">
                  {EXPERIENCE_LEVELS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Company Description */}
            <div className="flex flex-col">
              <label className="form-label">Company Description</label>
              <textarea
                rows={3}
                placeholder="ABC Software develops SaaS products for enterprise customers."
                className="form-control resize-none"
                required
              />
            </div>

            {/* Required Skills */}
            <div className="flex flex-col">
              <label className="form-label">Required Skills</label>
              <div className="stacked-tag-box">
                <div className="flex flex-wrap gap-2 min-h-7">
                  <span className="tag-badge-indigo">
                    NodeJS
                    <button type="button" className="tag-close-btn">
                      &times;
                    </button>
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="Type a skill and press Enter..."
                  className="tag-input-field"
                />
              </div>
            </div>

            {/* Benefits */}
            <div className="flex flex-col">
              <label className="form-label">Benefits</label>
              <div className="stacked-tag-box">
                <div className="flex flex-wrap gap-2 min-h-7">
                  <span className="tag-badge-emerald">
                    13th Month Salary
                    <button type="button" className="tag-close-btn">
                      &times;
                    </button>
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="Type a benefit and press Enter..."
                  className="tag-input-field"
                />
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <button type="submit" className="btn-primary">
              Generate Job Description
            </button>
          </form>
        </section>

        {/* RIGHT PANEL: LIVE PREVIEW & OUTPUT BOX */}
        <section className="bg-white border border-slate-200 rounded-2xl p-5 lg:p-6 shadow-xs flex flex-col gap-5 min-h-125">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
              Kết quả khởi tạo bài đăng
            </h2>
            <button className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-md transition-all cursor-pointer">
              <Copy size={14} /> Copy Job Description
            </button>
          </div>

          {/* DỮ LIỆU HIỂN THỊ CHI TIẾT VĂN BẢN (WHITE-SPACE PRESERVED) */}
          <div className="flex-1 flex flex-col gap-5 text-sm text-slate-700 leading-relaxed overflow-y-auto max-h-[calc(100vh-180px)] pr-1">
            {/* 1. Vị trí Header */}
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-lg font-black text-indigo-700">
                SENIOR BACKEND DEVELOPER
              </h3>
              <p className="text-xs text-slate-400 font-medium mt-1">
                🏢 ABC Software • 📍 Hồ Chí Minh • 📁 Engineering
              </p>
            </div>

            {/* 2. Khối nội dung About Company */}
            <div className="flex flex-col gap-1">
              <h4 className="font-bold text-slate-900 border-l-4 border-indigo-600 pl-2">
                About Company
              </h4>
              <p className="text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100 whitespace-pre-line">
                ABC Software là một doanh nghiệp hàng đầu chuyên phát triển các
                nền tảng phần mềm dạng dịch vụ (SaaS ERP) phục vụ cho các tập
                đoàn đa quốc gia...
              </p>
            </div>

            {/* 3. Khối nội dung Trách nhiệm */}
            <div className="flex flex-col gap-1">
              <h4 className="font-bold text-slate-900 border-l-4 border-indigo-600 pl-2">
                Key Responsibilities
              </h4>
              <ul className="list-disc pl-5 space-y-1 text-slate-600">
                <li>
                  Thiết kế và tối ưu hóa hệ thống cơ sở dữ liệu lớn sử dụng
                  PostgreSQL.
                </li>
                <li>
                  Xây dựng hệ thống các RESTful API hiệu năng cao bằng Node.js.
                </li>
                <li>
                  Đảm bảo tính sẵn sàng và khả năng mở rộng của dịch vụ trên hạ
                  tầng AWS.
                </li>
              </ul>
            </div>

            {/* 4. Khối nội dung Bonus: Bộ câu hỏi phỏng vấn */}
            <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-4 flex flex-col gap-3 mt-2">
              <h4 className="font-extrabold text-emerald-800 uppercase tracking-wider flex items-center gap-2 text-xs">
                🎯 Bonus Assignment: Gợi ý câu hỏi phỏng vấn
              </h4>
              <div className="space-y-2 text-xs">
                <div>
                  <h5 className="font-bold text-slate-800 mb-0.5">
                    💻 Technical Questions
                  </h5>
                  <p className="text-slate-600 pl-3">
                    1. Phân biệt cơ chế xử lý bất đồng bộ giữa Event Loop của
                    Node.js và Worker Threads?
                  </p>
                </div>
                <div>
                  <h5 className="font-bold text-slate-800 mb-0.5">
                    🧠 Behavioral Questions
                  </h5>
                  <p className="text-slate-600 pl-3">
                    1. Kể lại một tình huống bạn và Tech Lead bất đồng quan điểm
                    về mặt giải pháp kiến trúc?
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
