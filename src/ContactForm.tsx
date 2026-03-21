import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";

const countries = [
  { code: "+7", label: "RU" },
  { code: "+994", label: "AZ" },
  { code: "+375", label: "BY" },
  { code: "+7", label: "KZ" },
  { code: "+996", label: "KG" },
  { code: "+992", label: "TJ" },
  { code: "+998", label: "UZ" },
];

const ContactForm = () => {
  const [formData, setFormData] = useState({
    company: '',
    name: '',
    city: '',
    phone: '',
    email: ''
  });
  const [agreed, setAgreed] = useState(false);

  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  if (!agreed) {
    alert("Пожалуйста, примите политику конфиденциальности");
    return;
  }

  const templateParams = {
    company: formData.company,
    name: formData.name,
    city: formData.city,
    phone: `${selectedCountry.code} ${formData.phone}`,
    email: formData.email,
  };

  emailjs
    .send(
      "SERVICE_ID", 
      "TEMPLATE_ID", 
      templateParams,
      "PUBLIC_KEY"
    )
    .then(
      () => {
        alert("Заявка отправлена!");
        setFormData({
          company: "",
          name: "",
          city: "",
          phone: "",
          email: "",
        });
      },
      (error) => {
        console.error(error);
        alert("Ошибка отправки");
      }
    );
};
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-7 w-full max-w-[600px] font-sf-regular">
      <div className="relative">
        <input
          type="text"
          placeholder="Компания"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className="w-full border-b border-gray-200 py-3 outline-none focus:border-black transition-colors placeholder:text-[#AEAEAE] text-[18px]"
        />
      </div>
      <div className="relative">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Имя"
          className="w-full border-b border-gray-200 py-3 outline-none focus:border-black transition-colors placeholder:text-[#AEAEAE] text-[18px]"
        />
      </div>
      <div className="relative">
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="Город"
          className="w-full border-b border-gray-200 py-3 outline-none focus:border-black transition-colors placeholder:text-[#AEAEAE] text-[18px]"
        />
      </div>
      <div className="relative border-b border-gray-200 flex items-center" ref={dropdownRef}>
        <div 
          className="flex items-center cursor-pointer gap-2 py-3 pr-2 transition-colors rounded-t-md"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <span className={`text-[#AEAEAE] text-[9px] transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}>
            ▼
          </span>
          <span className="text-black text-[18px] font-medium">{selectedCountry.code}</span>
        </div>
        <AnimatePresence>
          {isDropdownOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-full left-0 mt-1 bg-white border border-gray-100 shadow-2xl z-[150] overflow-hidden min-w-[180px]"
            >
              {countries.map((c) => (
                <div 
                  key={c.code}
                  className={`px-4 py-3 hover:bg-gray-100 cursor-pointer flex items-center gap-3 transition-colors ${selectedCountry.code === c.code ? "bg-gray-50" : ""}`}
                  onClick={() => {
                    setSelectedCountry(c);
                    setIsDropdownOpen(false);
                  }}
                >
                  <span className="text-[15px] font-medium text-gray-800">{c.label}</span>
                  <span className="text-gray-400 text-[14px] ml-auto">{c.code}</span>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="(000) 000-00-00"
          className="w-full py-3 outline-none focus:border-black transition-colors placeholder:text-[#AEAEAE] text-[18px]"
        />
      </div>

      <div className="relative">
        <input
          type="email"
          placeholder="E-mail"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border-b border-gray-200 py-3 outline-none focus:border-black transition-colors placeholder:text-[#AEAEAE] text-[18px]"
        />
      </div>

      <div className="flex items-start gap-4 mt-4">
        <div className="relative flex items-center h-6">
          <input
            id="privacy"
            type="checkbox"
            checked={agreed}
            onChange={() => setAgreed(!agreed)}
            className="w-5 h-5 border border-gray-300 appearance-none checked:bg-black checked:border-black cursor-pointer transition-all relative after:content-['✓'] after:absolute after:text-white after:text-[12px] after:left-[3px] after:top-[-1px] after:hidden checked:after:block"
          />
        </div>
        <label htmlFor="privacy" className="text-[14px] leading-snug text-black/60">
          Я подтверждаю{" "}
          <a href="#" className="underline text-black underline-offset-2 cursor-pointer">
            Согласие на обработку персональных данных
          </a>{" "}
          и принимаю{" "}
          <a href="#" className="underline text-black underline-offset-2 cursor-pointer">
            Политику конфиденциальности
          </a>
        </label>
      </div>

      <button
        type="submit"
        className="w-full md:w-[200px] h-[60px] cursor-pointer bg-black text-white rounded-[10px] text-[18px] mt-4 hover:bg-black/80 transition-all disabled:bg-[#AEAEAE] disabled:cursor-default"
        disabled={!agreed}
      >
        Отправить
      </button>
    </form>
  );
};

export default ContactForm;