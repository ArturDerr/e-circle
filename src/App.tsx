import logo from "../public/img/logo.svg"
import lin from "../public/img/lin.png"
import done from "../public/img/done.png"
import arrow from "../public/img/arrow.png"
import tap from "../public/img/tap.png"
import wb from "../public/img/wb.png"
import bg_footer from "../public/img/bg-footer.svg"
import ozon from "../public/img/ozon.png"
import yam from "../public/img/yandex.png"
import school from "../public/img/school.png"
import student from "../public/img/stutend.png"
import bg_card from "../public/img/bg-card.png"
import woman from "../public/img/woman.png"
import wb_ozon from "../public/img/wb_ozon.png"
import man from "../public/img/man.png"
import group from "../public/img/group.svg"
import { AnimatePresence, motion, useInView, useMotionValueEvent, useScroll } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import ScrollStack, { ScrollStackItem } from "./ScrollStack"
import RoughCircle from "./RoughCircle"

type FormData = {
  company: string;
  name: string;
  city: string;
  phone: string;
  email: string;
};

const navLinks = [
  "Преимущества",
  "Как это работает",
  "Ассортимент",
  "Оптовым покупателям",
  "FAQ"
];

function App() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [agreed, setAgreed] = useState<boolean>(false);

  const [formData, setFormData] = useState<FormData>({
    company: '',
    name: '',
    city: '',
    phone: '',
    email: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);

  const checkScrollLimits = (): void => {
    const node = scrollRef.current;
    if (node) {
      const { scrollLeft, scrollWidth, clientWidth } = node;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const handleScroll = (direction: 'left' | 'right'): void => {
    const node = scrollRef.current;
    if (node) {
      const scrollAmount = 440;
      node.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const node = scrollRef.current;
    if (node) {
      node.addEventListener("scroll", checkScrollLimits);
      checkScrollLimits();
      return () => node.removeEventListener("scroll", checkScrollLimits);
    }
  }, []);

  const { scrollY } = useScroll();
  const [headerHidden, setHeaderHidden] = useState(false);
  const [isWhiteHeader, setIsWhiteHeader] = useState(false);

  const whiteSectionRef = useRef<HTMLElement>(null);
  const darkSectionRef = useRef<HTMLElement>(null);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;

    if (latest > previous && latest > 150) {
      setHeaderHidden(true);
    } else {
      setHeaderHidden(false);
    }

    if (whiteSectionRef.current) {
      const offset = whiteSectionRef.current.offsetTop;
      setIsWhiteHeader(latest >= offset - 70);
    }
  });

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHeaderHidden(true);
    } 
    else {
      setHeaderHidden(false);
    }
  });
  const [isPerfectStarted, setIsPerfectStarted] = useState(false);

  const heroRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLElement>(null);
    
  const [headerTheme, setHeaderTheme] = useState<'transparent' | 'white' | 'dark'>('transparent');

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;

    if (latest > previous && latest > 150) setHeaderHidden(true);
    else setHeaderHidden(false);

    const whiteTop = whiteSectionRef.current?.offsetTop ?? 0;
    const darkTop = darkSectionRef.current?.offsetTop ?? 0;
    const footerTop = footerRef.current?.offsetTop ?? 0;

    if (latest < 100) {
      setHeaderTheme('transparent');
    } else if (latest >= whiteTop - 50 && latest < darkTop - 50) {
      setHeaderTheme('white');
    } else if (latest >= darkTop - 50) {
      setHeaderTheme('dark');
    }
  });

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <body className="font-sf-regular bg-white">
      <motion.header 
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: "-100%", opacity: 0 }
        }}
        animate={headerHidden ? "hidden" : "visible"}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-colors duration-500 py-[10px] items-center px-[19px] flex flex-row justify-between 
          ${isWhiteHeader 
            ? "bg-white" 
            : "bg-transparent border-[#2C2C2C] text-white"
          }`}
      >
        <div>
          <img 
            src={logo} 
            style={{ filter: isWhiteHeader ? "invert(1)" : "none" }} 
            className="flex cursor-pointer w-[85px] h-[50px] transition-all duration-500"
          />
        </div>

        <div 
          className="flex flex-row justify-between gap-12"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {navLinks.map((link, idx) => {
            const isDimmed = hoveredIndex !== null && hoveredIndex !== idx;
            return (
              <a
                key={idx}
                onMouseEnter={() => setHoveredIndex(idx)}
                className={`rounded-full text-center transition-colors duration-200 cursor-pointer text-[16px]
                  ${isDimmed 
                    ? (isWhiteHeader ? "text-black/20" : "text-white/20") 
                    : (isWhiteHeader ? "text-black" : "text-white")
                  }
                `}
              >
                {link}
              </a>
            );
          })}
        </div>

        <div className={`px-4 py-2 cursor-pointer transition-all duration-200 rounded-lg
          ${isWhiteHeader ? "bg-black text-white hover:bg-black/70" : "bg-white text-black"}`}
        >
          <p className="font-sf-regular">Купить</p>
        </div>
      </motion.header>
      <section className="bg-[#161615]">
        <div className="min-h-screen flex items-center justify-center">
          <div className="relative flex w-[1100px] h-[950px] flex-col items-center justify-center text-center overflow-hidden">
            <img src={group} className="absolute inset-0 w-full h-full object-cover object-bottom z-10"/>
            <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0">
              <source src="/video/0216(5).mp4" type="video/mp4" />
            </video>
            <div className="relative text-center flex flex-col justify-between gap-100">
              <motion.div
                initial={{ opacity: 0, y: -80 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative text-center flex flex-col justify-between gap-100"
              >
                <div className="flex justify-center mix-blend-difference items-center flex-col mr-60">
                  <motion.h1
                    initial={{ opacity: 0, y: -60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="text-white font-sf-medium text-[65px] mix-blend-difference"
                  >
                    Идеальный круг
                  </motion.h1>

                  <motion.h1
                    initial={{ opacity: 0, y: -60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="font-sf-medium ml-70 text-white text-[65px] leading-8 mix-blend-difference"
                  >
                    — с первой кнопки
                  </motion.h1>
                </div>

                <motion.p
                  initial={{ opacity: 0, y: -40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.6 }}
                  className="mt-6 text-[20px] leading-6 font-sf-regular text-white mix-blend-difference"
                >
                  Первый электрический <br />циркуль-линейка
                </motion.p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      <section ref={whiteSectionRef} className="bg-white justify-between gap-30 flex flex-col w-full h-full rounded-t-[40px]">
        <div className="flex flex-col px-10 pt-7 justify-between gap-[80px]">
          <div>
            <p className="font-sf-regular text-[42px]">Преимущества</p>
          </div>
          <div className="flex flex-row w-full justify-between gap-3">
            <div className="h-[430px] w-full rounded-[12px] p-6 flex flex-col justify-between bg-[#F0F0F0]/53 relative overflow-hidden">
              <div>
                <img src={tap} className="w-7 h-7"/>
              </div>
              <div className="flex flex-col justify-between">
                <p className="text-black font-sf-regular flex text-[32px]">Одно нажатие</p>
                <p className="text-black/40 font-sf-regular flex text-[20px]">
                  Никакой сложности
                </p>
              </div>
            </div>
            <div className="h-[430px] w-full rounded-[12px] p-6 flex flex-col justify-between bg-[#357DFF]/90 relative overflow-hidden">
              <div>
                <img src={lin} className="w-11 h-4"/>
              </div>
              <div className="flex flex-col justify-between">
                <p className="text-white font-sf-regular flex text-[32px]">Встроенная линейка </p>
                <p className="text-white/40 font-sf-regular flex text-[20px]">
                  Никаких лишних инструментов
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col px-10 pt-7 justify-between gap-[100px]">
          <div className="border-black/10 flex flex-row justify-between gap-auto border-t">
            <p className="font-sf-regular text-[42px] mt-6 leading-11">E-circle меняет <br/> правила черчения</p>
            <p className="font-sf-regular text-[16px] py-1 px-3 h-8 rounded-[6px] text-black/40 mt-6 bg-[#F5F5F5]">Испытай разницу E-circle</p>
          </div>
          <div className="flex flex-row justify-between gap-3">
            <div className="h-[720px] w-full rounded-[20px] py-4 px-6 bg-[#F0F0F0]/53">
              <p className="text-black/30 text-[17px]">Обычный циркуль</p>
              <div className="h-full">
                <RoughCircle targetPercent={82} isPerfect={false} />
              </div>
            </div>
            <div className="h-[720px] w-full rounded-[20px] py-4 px-6 bg-[#F0F0F0]/53 relative overflow-hidden">
              <p className="text-black text-[17px] relative z-10">Циркуль E-circle</p>
              
              <div className="h-full flex items-center justify-center">
                <RoughCircle 
                  targetPercent={100} 
                  isPerfect={true} 
                  startTrigger={isPerfectStarted} 
                />
              </div>
              <AnimatePresence>
                {!isPerfectStarted && (
                  <motion.div 
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="absolute inset-0 z-20 flex items-center justify-center backdrop-blur-md bg-white/10"
                  >
                    <motion.button 
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      whileTap={{ scale: 0.55 }}
                      onClick={() => setIsPerfectStarted(true)}
                      className="font-sf-regular text-[18px] cursor-pointer py-6 px-8 rounded-[12px] text-white bg-black shadow-2xl transition-all"
                    >
                      Попробовать
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
        <div className="flex flex-col px-10 pt-7 justify-between gap-[100px]">
          <div className="border-black/10 flex flex-row justify-between gap-auto border-t">
            <div className="flex flex-row items-center justify-between gap-auto w-full">
              <p className="font-sf-regular text-[24px] mt-6 flex leading-7">Купите нашу продукцию <br/> на маркетплейсах</p>
              <div className="flex flex-row items-center mt-7 justify-between gap-2">
                <div className="rounded-[10px] gap-3 border-[#9313F2] border items-center flex text-center h-4 py-8 px-10 text-[#9313F2] hover:bg-[#9313F2] hover:text-white transition-all duration-300 cursor-pointer">
                  <img src={wb} className="w-[22px] h-[22px] transition-all duration-300 brightness-100 group-hover:brightness-0 group-hover:invert" /> 
                  <p className="font-medium">Купить на Wildberries</p>
                </div>
                <div className="rounded-[10px] gap-3 items-center flex text-center h-4 py-8 px-15 bg-[#357DFF] hover:bg-[#216dfa] transition-colors duration-300 cursor-pointer">
                  <img src={ozon} className="w-[22px] h-[22px]"/>
                  <p className="text-white font-medium">Купить на OZON</p>
                </div>
                <div className="rounded-[10px] gap-3 items-center flex text-center h-4 py-8 px-10 bg-[#FFE23B] hover:bg-[#E6CC35] transition-colors duration-300 cursor-pointer">
                  <img src={yam} className="w-[27px] h-[22px]"/>
                  <p className="text-black font-medium">Купить на Яндекс Маркете</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section ref={null} className="bg-[#131313] justify-between gap-40 mt-30 pb-50 flex flex-col w-full rounded-t-[40px]">
        <div className="flex flex-col px-10 pt-7 justify-between gap-[100px]">
          <div className="flex flex-row justify-between gap-auto w-full">
            <p className="font-sf-regular text-[42px] mt-6 leading-11 text-white">Как это <br/>работает</p>
            <p className="font-sf-regular text-[16px] py-1 px-3 h-8 rounded-[6px] text-white/80 mt-6 bg-white/11">Краткая инструкция</p>
          </div>
          <div className="w-full flex flex-col justify-between gap-3">
            <div className="h-[283px] w-full rounded-[12px] p-6 flex flex-col justify-between bg-white/6 relative overflow-hidden">
              <p className="text-white font-sf-regular flex text-[32px] leading-8">Соедини одно <br/> с другим</p>
              <div className="w-full justify-between flex flex-row">
                <p className="text-white/40 font-sf-regular flex text-[20px]">
                  Просто соедини части циркуля
                </p>
                <img src={arrow} className="w-[29px]"/>
              </div>
            </div>
            <div className="h-[283px] w-full rounded-[12px] p-6 flex flex-col justify-between bg-[#357DFF] relative overflow-hidden">
              <p className="text-white font-sf-regular flex text-[32px] leading-8">Тут же поставь <br/> радиус</p>
              <div className="w-full justify-between items-center flex flex-row">
                <img src={bg_card} className="absolute mb-50 w-[285px] h-[219px] z-[-10px]"/>
                <p className="text-white/40 font-sf-regular flex text-[20px]">
                  Используй встроенную линейку
                </p>
                <img src={arrow} className="w-[29px]"/>
              </div>
            </div>
            <div className="h-[283px] w-full rounded-[12px] p-6 flex flex-col justify-between bg-white/6 relative overflow-hidden">
              <p className="text-white font-sf-regular flex text-[32px] leading-8">Нажми кнопку</p>
              <div className="w-full justify-between flex flex-row">
                <p className="text-white/40 font-sf-regular flex text-[20px]">
                  Циркуль сделает все за тебя!
                </p>
                <img src={done} className="w-[26px]"/>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col px-10 pt-7 justify-between gap-[80px]">
          <div className="border-white/10 flex flex-row justify-between gap-auto border-t">
            <p className="font-sf-regular text-[42px] mt-6 leading-11 text-white">Тебе нужен E-circle, если ты</p>
            <div className="group border-white hover:bg-white flex border justify-center text-center mt-6 items-center rounded-full w-[162px] h-[162px] transition-all duration-500 cursor-pointer">
              <p className="text-white group-hover:text-black transition-colors duration-300 text-[16px]">
                Купить сейчас
              </p>
            </div>
          </div>
          <div className="w-full flex flex-col justify-between gap-8">
            <div className="border-white/10 w-full py-5 flex flex-row justify-between border-t relative overflow-hidden">
              <div className="flex flex-row justify-between gap-5">
                <p className="text-white font-sf-regular flex text-[32px]">
                  Школьник
                </p>
                <img src={school} className="w-[35px] flex mt-3 h-[35px]" />
              </div>
              <p className="text-white/40 text-[20px] w-65 leading-6">Чтобы чертеж был гордостью, а не мучением. Выше оценка, меньше стресса</p>
            </div>
            <div className="border-white/10 w-full py-5 flex flex-row justify-between border-t relative overflow-hidden">
              <div className="flex flex-row justify-between gap-5">
                <p className="text-white font-sf-regular flex text-[32px]">
                  Студент
                </p>
                <img src={student} className="w-[35px] flex mt-3 h-[35px]" />
              </div>
              <p className="text-white/40 text-[20px] w-65 leading-6">Точные чертежи, меньше исправлений, выше баллы и спокойнее сессия</p>
            </div>
            <div className="border-white/10 w-full py-5 flex flex-row justify-between border-t relative overflow-hidden">
              <div className="flex flex-row justify-between gap-5">
                <p className="text-white font-sf-regular flex text-[32px]">
                  Родитель
                </p>
                <img src={woman} className="w-[35px] flex mt-3 h-[35px]" />
              </div>
              <p className="text-white/40 text-[20px] w-65 leading-6">Чтобы подарить ребенку не просто циркуль, а уверенность и лучший результат</p>
            </div>
            <div className="border-white/10 w-full py-5 flex flex-row justify-between border-t relative overflow-hidden">
              <div className="flex flex-row justify-between gap-5">
                <p className="text-white font-sf-regular flex text-[32px]">
                  Художник
                </p>
                <img src={man} className="w-[35px] mt-3 flex h-[35px]" />
              </div>
              <p className="text-white/40 text-[20px] w-65 leading-6">Когда важна каждая линия.  Инструмент, который даёт контроль над формой и позволяет сосредоточиться на творчестве</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col px-10 pt-7 justify-between gap-[120px]">
          <div className="border-white/10 flex flex-row justify-between gap-auto border-t">
            <p className="font-sf-regular text-[42px] mt-6 leading-11 text-white">Ассортимент</p>
            <div className="mt-4 flex flex-row justify-between gap-1">
              <img 
                src={arrow} 
                alt="Prev"
                onClick={() => canScrollLeft && handleScroll("left")}
                className={`w-[29px] h-[29px] rotate-90 transition-all duration-300 ${
                  canScrollLeft ? "cursor-pointer opacity-100" : "opacity-20 grayscale"
                }`}
              />
              <img 
                src={arrow} 
                alt="Next"
                onClick={() => canScrollRight && handleScroll("right")}
                className={`w-[29px] h-[29px] rotate-270 transition-all duration-300 ${
                  canScrollRight ? "cursor-pointer opacity-100" : "opacity-20 grayscale"
                }`}
              />
            </div>
          </div>
          <div 
            ref={scrollRef}
            className="w-full flex flex-row gap-3 overflow-x-auto no-scrollbar pb-10"
          >
            <div className="min-w-[400px] h-[400px] rounded-[12px] p-6 flex flex-col justify-between bg-white/5 flex-shrink-0">
            </div>
            <div className="min-w-[400px] h-[400px] rounded-[12px] p-6 flex flex-col justify-between bg-white/5 flex-shrink-0">
            </div>
            <div className="min-w-[400px] h-[400px] rounded-[12px] p-6 flex flex-col justify-between bg-white/5 flex-shrink-0">
            </div>
            <div className="min-w-[400px] h-[400px] rounded-[12px] p-6 flex flex-col justify-between bg-white/5 flex-shrink-0">
            </div>
            <div className="min-w-[400px] h-[400px] rounded-[12px] p-6 flex flex-col justify-between bg-white/5 flex-shrink-0">
            </div>
            <div className="min-w-[400px] h-[400px] rounded-[12px] p-6 flex flex-col justify-between bg-white/5 flex-shrink-0">
            </div>
            <div className="min-w-[400px] h-[400px] rounded-[12px] p-6 flex flex-col justify-between bg-white/5 flex-shrink-0">
            </div>
            <div className="min-w-[400px] h-[400px] rounded-[12px] p-6 flex flex-col justify-between bg-white/5 flex-shrink-0">
            </div>
            <div className="min-w-[400px] h-[400px] rounded-[12px] p-6 flex flex-col justify-between bg-white/5 flex-shrink-0">
            </div>
          </div>
        </div>
        <div className="flex flex-col px-10 pt-7 justify-between gap-[100px]">
          <div className="border-white/10 flex flex-row justify-between gap-auto border-t">
            <div className="flex flex-row items-center justify-between gap-auto w-full">
              <div className="flex flex-col mt-10">
                <img src={wb_ozon} className="w-[299px]"/>
                <p className="font-sf-regular text-[20px] text-white mt-9 flex leading-7">Вы можете приобрести нашу продукцию<br/> на маркетплейсах OZON и Wildberries.</p>
              </div>
              <div className="flex flex-row items-center justify-between gap-2">
                <div className="rounded-[10px] gap-3 border-white border items-center flex text-center h-4 py-8 px-10 text-white hover:bg-[white] hover:text-black transition-all duration-300 cursor-pointer">
                  <img src={wb} className="w-[22px] h-[22px] transition-all duration-300 brightness-100 group-hover:brightness-0 group-hover:invert" /> 
                  <p className="font-medium">Купить на Wildberries</p>
                </div>
                <div className="rounded-[10px] gap-3 items-center flex text-center h-4 py-8 px-15 bg-white hover:bg-white/80 text-black transition-colors duration-300 cursor-pointer">
                  <img src={ozon} className="w-[22px] h-[22px]"/>
                  <p className="text-black font-medium">Купить на OZON</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white mt-[-100px] justify-between gap-30 flex flex-col w-full h-full rounded-t-[40px]">
        <div className="flex flex-col px-10 pt-7 justify-between gap-[80px]">
          <div>
            <div className="flex flex-row justify-between">
              <p className="font-sf-regular text-[42px] mt-6 leading-11">Оптовым <br/>покупателям</p>
              <p className="font-sf-regular text-[16px] py-1 px-3 h-8 rounded-[6px] text-black/40 mt-6 bg-[#F5F5F5]">E-circle для бизнеса</p>
            </div>
            <p className="text-[22px] mt-17 leading-6"><span className="text-[#357DFF]">Станьте первым,</span> кто предложит на рынке инновационный <br/> электрический циркуль. Высокая маржинальность и растущий спрос.</p>
          </div>
          <div className="w-full flex flex-row justify-between">
            <div className="max-w-[600px] bg-white font-sf-regular">
              <form className="flex flex-col gap-7">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Компания"
                    name="company" 
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full border-b border-gray-200 py-3 outline-none focus:border-black transition-colors placeholder:text-gray-400 text-[18px]"
                  />
                </div>
                <div className="relative">
                  <input
                    type="text"
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Имя"
                    className="w-full border-b border-gray-200 py-3 outline-none focus:border-black transition-colors placeholder:text-gray-400 text-[18px]"
                  />
                </div>
                <div className="relative">
                  <input
                    type="text"
                    name="city" 
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Город"
                    className="w-full border-b border-gray-200 py-3 outline-none focus:border-black transition-colors placeholder:text-gray-400 text-[18px]"
                  />
                </div>
                <div className="relative border-b border-gray-200 flex items-center">
                  <span className="text-gray-400 text-[18px] mr-2">▾</span>
                  <span className="text-black text-[18px] mr-2">+7</span>
                  <input
                    type="tel"
                    name="phone" 
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(000) 000-00-00"
                    className="w-full py-3 outline-none focus:border-black transition-colors placeholder:text-gray-400 text-[18px]"
                  />
                </div>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="E-mail"
                    name="email" 
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border-b border-gray-200 py-3 outline-none focus:border-black transition-colors placeholder:text-gray-400 text-[18px]"
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
                  <label htmlFor="privacy" className="text-[14px] leading-snug text-black cursor-pointer">
                    Я подтверждаю{" "}
                    <a href="#" className="underline underline-offset-2">
                      Согласие на обработку персональных данных
                    </a>{" "}
                    и принимаю{" "}
                    <a href="#" className="underline underline-offset-2">
                      Политику конфиденциальности
                    </a>
                  </label>
                </div>
                <button
                  type="submit"
                  className="w-[200px] h-[60px] cursor-pointer bg-black duration-200 text-white rounded-[10px] text-[18px] mt-4 hover:bg-black/80 transition-all active:scale-95"
                >
                  Отправить
                </button>
              </form>
            </div>
            <div>
              <p className="text-[35px] text-black cursor-pointer underline">e-circle@gmail.com</p>
              <p className="text-black/30 text-[18px]">Свяжитесь с нами</p>
            </div>
          </div>
        </div>
        <div className="flex flex-row px-10 pt-7 justify-between">
          <div className="border-black/10 w-full justify-between flex flex-row border-t">
            <div className="flex flex-row justify-between gap-auto mr-80">
              <p className="font-sf-regular text-[42px] mt-6 leading-11 text-black">Что вы получаете, став нашим партнером</p>
            </div>
            <div className="w-full flex flex-col justify-between gap-12">
              <div className="w-full py-4 flex flex-row justify-between relative overflow-hidden">
                <div className="flex flex-row justify-between gap-5">
                  <p className="text-black font-sf-regular flex text-[32px]">
                    Эксклюзивность
                  </p>
                </div>
                <p className="text-black/40 text-[20px] w-65 leading-6">Новый товар на категории вашего рынка.</p>
              </div>
              <div className="border-black/10 w-full py-4 flex flex-row justify-between border-t relative overflow-hidden">
                <div className="flex flex-row justify-between gap-5">
                  <p className="text-black font-sf-regular flex text-[32px]">
                    Рекламная поддержка
                  </p>
                </div>
                <p className="text-black/40 text-[20px] w-65 leading-6">Мы создаем ажиотаж через контентную рекламу, облегчая ваши продажи.</p>
              </div>
              <div className="border-black/10 w-full py-4 flex flex-row justify-between border-t relative overflow-hidden">
                <div className="flex flex-row justify-between gap-5">
                  <p className="text-black font-sf-regular flex text-[32px]">
                    Выгодные условия
                  </p>
                </div>
                <p className="text-black/40 text-[20px] w-65 leading-6">Специальные оптовые цены от производителя.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer ref={null} className="bg-[#131313] justify-between gap-40 mt-30 pb-8 flex flex-col w-full rounded-t-[40px]">
        <div className="w-full h-[660px] absolute z-[-10px] overflow-hidden">
          <img 
            src={bg_footer} 
            className="w-full h-full object-cover object-top" 
            alt="Background Footer"
          />
        </div>  
        <div className="flex flex-col px-10 pt-7 justify-between z-10 gap-[100px]">
          <div className="flex flex-row justify-between gap-auto w-full">
            <div className="flex flex-col justify-between gap-12">
              <p className="font-sf-regular text-[42px] mt-6 leading-11 text-white">Идеальный круг <br/>— с первой кнопки</p>
              <div className="flex flex-row items-center justify-between gap-2">
                <div className="rounded-[10px] gap-3 border-white border items-center flex text-center h-4 py-8 px-10 text-white hover:bg-[white] hover:text-black transition-all duration-300 cursor-pointer">
                  <img src={wb} className="w-[22px] h-[22px] transition-all duration-300 brightness-100 group-hover:brightness-0 group-hover:invert" /> 
                  <p className="font-medium">Купить на Wildberries</p>
                </div>
                <div className="rounded-[10px] gap-3 items-center flex text-center h-4 py-8 px-15 bg-white hover:bg-white/80 text-black transition-colors duration-300 cursor-pointer">
                  <img src={ozon} className="w-[22px] h-[22px]"/>
                  <p className="text-black font-medium">Купить на OZON</p>
                </div>
              </div>
            </div>
            <img src={logo} className="w-30 justify-start flex mb-25"/>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="flex flex-col gap-2">
              <h4 className="text-[16px] mb-2 text-white">Купить</h4>
              <a href="#" className="hover:text-white text-white/40 transition-colors">Ozon</a>
              <a href="#" className="hover:text-white text-white/40 transition-colors">Wildberries</a>
              <a href="#" className="hover:text-white text-white/40 transition-colors">Яндекс Маркет</a>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-blwhiteack/40 text-[16px] mb-2 text-white">Компания</h4>
              <a href="#" className="hover:text-white text-white/40 transition-colors">О нас</a>
              <a href="#" className="hover:text-white text-white/40 transition-colors">Для оптовиков</a>
              <a href="#" className="hover:text-white text-white/40 transition-colors">Контакты</a>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-white hover:text-white text-[16px] mb-2 cursor-pointer">Контакты</h4>
              <p className="text-white/40 hover:text-white transition-colors cursor-pointer">Email для общих вопросов</p>
              <p className="text-white/40 hover:text-white transition-colors cursor-pointer">Email для оптовых закупок</p>
            </div>
            <div className="flex flex-col items-end justify-end">
              <a href="mailto:email@example.ru" className="text-[32px] text-white font-sf-medium underline leading-none">
                e-circle@example.ru
              </a>
            </div>
          </div>
          <div className="flex flex-row justify-between items-center text-[14px] text-white/40 border-t border-white/5 pt-6">
            <p>E-circle</p>
            <div className="flex gap-10">
              <a href="#" className="hover:text-white underline transition-colors">Политику конфиденциальности</a>
              <a href="#" className="hover:text-white underline transition-colors">Согласие на обработку персональных данных</a>
            </div>
            <p>2026</p>
          </div>
        </div>
      </footer>
    </body>
  );
}

export default App;
