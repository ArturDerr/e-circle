import logo from "/img/logo.svg"
import logo_sm from "/img/logo_small.png"
import lin from "/img/lin.png"
import done from "/img/done.png"
import arrow from "/img/arrow.png"
import tap from "/img/tap.png"
import qr2 from "/img/qr2.png"
import wb from "/img/wb.png"
import tg from "/img/telegram-communication-chat-interaction-network-connection-svgrepo-com.svg"
import bg_footer from "/img/bg-footer.svg"
import ozon from "/img/ozon.png"
import yam from "/img/yandex.png"
import school from "/img/school.png"
import student from "/img/stutend.png"
import video from "../public/video/0216(5).mp4"
import bg_card from "/img/bg-card.png"
import woman from "/img/woman.png"
import wb_ozon from "/img/wb_ozon.png"
import man from "/img/man.png"
import group from "/img/group.png"
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import RoughCircle from "./RoughCircle"
import ContactForm from "./ContactForm"

const navLinks = [
  { label: "Преимущества", href: "#advantages" },
  { label: "Как это работает", href: "#how" },
  { label: "Ассортимент", href: "#catalog" },
  { label: "Оптовым покупателям", href: "#wholesale" },
];

function App() {
  const scrollRef = useRef<HTMLDivElement>(null);

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
  
  const [isAtTop, setIsAtTop] = useState(true);
  const [isLogoBig, setIsLogoBig] = useState(true);


  const whiteSectionRef = useRef<HTMLElement>(null);
  const howItWorksRef = useRef<HTMLElement>(null); 
  const wholesaleRef = useRef<HTMLElement>(null); 

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsAtTop(latest < 860);
    const previous = scrollY.getPrevious() ?? 0;

    if (latest > previous && latest > 150) {
      setHeaderHidden(true);
    } else {
      setHeaderHidden(false);
    }

    setIsLogoBig(latest < 5);

    const white1 = whiteSectionRef.current?.offsetTop || 0;
    const dark2 = howItWorksRef.current?.offsetTop || 0;
    const white2 = wholesaleRef.current?.offsetTop || 0;

    if (latest >= white2 - 70) {
      setIsWhiteHeader(true); 
    } else if (latest >= dark2 - 70) {
      setIsWhiteHeader(false);
    } else if (latest >= white1 - 70) {
      setIsWhiteHeader(true); 
    } else {
      setIsWhiteHeader(false); 
    }
  });
  const [isPerfectStarted, setIsPerfectStarted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const [isHolding, setIsHolding] = useState(false);

  return (
    <body className="font-sf-regular bg-white">
      <motion.header 
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: "-100%", opacity: 0 }
        }}
        animate={headerHidden ? "hidden" : "visible"}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 ${isMenuOpen ? "border-none py-[0px]" : isAtTop 
            ? "bg-transparent py-[10px] text-white" 
            : isWhiteHeader 
              ? "bg-white text-black py-[10px]" 
              : "bg-[#131313] text-white py-[10px]" } left-0 right-0 z-[420] transition-colors duration-500 items-center px-[19px] flex flex-row justify-between 
          ${isAtTop 
            ? "bg-transparent text-white" 
            : isWhiteHeader 
              ? "bg-white text-black" 
              : "bg-[#131313] text-white" 
          }`}
      >
        <div>
          <img 
            src={logo} 
            style={{ filter: isWhiteHeader ? "invert(1)" : "none" }} 
            className={`cursor-pointer transition-all duration-500 
              ${isMenuOpen ? "hidden" : "flex"}
              ${isLogoBig ? "w-[140px] h-[80px]" : "w-[85px] h-[50px]"}
            `}
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
                href={link.href}
                onMouseEnter={() => setHoveredIndex(idx)}
                className={`rounded-full text-center hidden lg:flex transition-colors duration-200 cursor-pointer text-[16px]
                  ${isDimmed 
                    ? (isWhiteHeader ? "text-black/20" : "text-white/20") 
                    : (isWhiteHeader ? "text-black" : "text-white")
                  }
                `}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        <a href="https://t.me/tru_blog" className={`hidden lg:flex py-3 px-4 cursor-pointer transition-all duration-200 rounded-lg
          ${isWhiteHeader ? "bg-black text-white hover:bg-black/70" : "bg-white text-black hover:bg-white/70"}`}
        >
            <p className="font-sf-medium mr-2">Telegram</p>
            <img src={tg} className="w-5"/>
        </a>
      <div 
        className="lg:hidden fixed top-[28px] right-[29px] z-[120] flex flex-col gap-1 cursor-pointer"
        onClick={() => setIsMenuOpen(prev => !prev)}
      >
        <span className={`w-6 h-[2px] transition-all ${isWhiteHeader ? "bg-black" : "bg-white"} ${isMenuOpen ? "bg-white" : isWhiteHeader ? "bg-black" : "bg-white"} ${isMenuOpen ? "rotate-45 translate-y-[6px]" : ""}`} />
        <span className={`w-6 h-[2px] transition-all ${isWhiteHeader ? "bg-black" : "bg-white"} ${isMenuOpen ? "bg-white" : isWhiteHeader ? "bg-black" : "bg-white"} ${isMenuOpen ? "opacity-0" : ""}`} />
        <span className={`w-6 h-[2px] transition-all ${isWhiteHeader ? "bg-black" : "bg-white"}  ${isMenuOpen ? "bg-white" : isWhiteHeader ? "bg-black" : "bg-white"} ${isMenuOpen ? "-rotate-45 -translate-y-[6px]" : ""}`} />
      </div>
      </motion.header>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 px-6 pt-6 bg-[#161615] z-[305] flex flex-col items-start gap-4"
          >
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-white text-[24px]"
              >
                {link.label}
              </a>
            ))}

            <div className="mb-26 mt-auto w-full justify-end flex flex-col gap-2">
              <div className="bg-white text-black px-6 py-3 rounded-lg text-center">
                Купить на Ozon
              </div>
              <div className="border w-full border-white text-white px-6 py-3 rounded-lg text-center">
                Купить на Wildberries
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <section className="bg-[#161615] px-4"> 
        <div className="min-h-screen flex items-center flex-col justify-center">
          <div className="relative flex w-full max-w-[1100px] aspect-[4/5] md:aspect-[12/9.7] flex-col items-center justify-center text-center overflow-hidden">
            <video 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="absolute inset-0 w-full h-full object-cover object-top z-0"
            >
              <source src={video} type="video/mp4" />
            </video>

            <div className="relative z-10 flex flex-col items-center text-center gap-8 md:gap-20 px-2">

               <div className="flex justify-center items-center mb-60 md:mb-0 flex-col z-10 md:mr-60">
                  <motion.h1
                    initial={{ opacity: 0, y: -60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="text-white text-[36px] md:text-[65px] font-sf-medium leading-tight"
                  >
                    Идеальный круг
                  </motion.h1>

                  <motion.h1
                    initial={{ opacity: 0, y: -60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="text-white mt-[-10px] text-[36px] md:text-[65px] font-sf-medium leading-tight md:ml-50"
                  >
                    — с первой кнопки
                  </motion.h1>

                </div>

                <motion.p
                  initial={{ opacity: 0, y: -40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.6 }}
                  className="mt-4 md:mt-66 text-[20px] md:text-[20px] mb-6 md:mb-10 leading-6 font-sf-regular text-white"
                >
                  Первый электрический <br className="hidden md:block" />
                  циркуль-линейка
                </motion.p>

            </div>

          </div>
          <div className="hidden lg:flex flex-row justify-between z-40 px-10 items-center gap-6 absolute bottom-10 w-full">
            <div className="flex flex-row items-center gap-4">
              <div className="border border-white rounded-full px-5 py-3 flex items-center justify-center cursor-pointer hover:bg-white/10 transition-all">
                <p className="text-white text-[16px]">Купить оптом →</p>
              </div>
            </div>
            <div className="flex flex-row items-center gap-4">
              <div className="bg-white rounded-full px-5 py-3 flex items-center gap-2 cursor-pointer hover:bg-white/80 transition-all">
                <img src={ozon} className="w-5 h-5"/>
                <p className="text-black text-[16px]">Купить на Ozon</p>
              </div>

              <div className="border border-white rounded-full px-5 py-3 flex items-center gap-2 cursor-pointer hover:bg-white/10 transition-all">
                <img src={yam} className="w-6 h-5"/>
                <p className="text-white text-[16px]">Купить на Яндекс.Маркете</p>
              </div>

              <div className="border border-white rounded-full px-5 py-3 flex items-center gap-2 cursor-pointer hover:bg-white/10 transition-all">
                <img src={wb} className="w-5 h-5"/>
                <p className="text-white text-[16px]">Купить на Wildberries</p>
              </div>

            </div>
            <p className="text-white font-sf-regular text-[20px] leading-6 max-w-[320px]">
              Точность, скорость и удобство для школы, творчества и работы.
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <div className="flex invisible">
            <p>К</p>
          </div>
          <div className="flex invisible">
            <p>К</p>
          </div>
        </div>
      </section>
      <section id="advantages" ref={whiteSectionRef} className="bg-white relative z-10 justify-between mt-[-35px] gap-30 flex flex-col w-full h-full rounded-t-[40px]">
        <div className="flex flex-col px-5 md:px-10 pt-7 justify-between gap-[80px]">
          <div>
            <p className="font-sf-regular text-[35px] md:text-[42px]">Преимущества</p>
          </div>
          <div className="flex flex-col md:flex-row w-full justify-between gap-3">
            <div className="h-[450px] w-full rounded-[12px] p-6 flex flex-col justify-between bg-[#F0F0F0]/53 relative overflow-hidden">
              <div>
                <img src={tap} className="w-7 h-7"/>
              </div>
              <div className="flex flex-col justify-between">
                <p className="text-black font-sf-regular flex text-[28px] md:text-[32px]">Одно нажатие</p>
                <p className="text-black/40 font-sf-regular flex text-[16px] md:text-[20px]">
                  Никакой сложности
                </p>
              </div>
            </div>
            <div className="h-[450px] w-full rounded-[12px] p-6 flex flex-col justify-between bg-[#F0F0F0]/53 relative overflow-hidden">
              <div>
                <img src={lin} className="w-11 h-4"/>
              </div>
              <div className="flex flex-col justify-between">
                <p className="text-black font-sf-regular flex text-[28px] md:text-[32px]">Встроенная линейка </p>
                <p className="text-black/40 font-sf-regular flex text-[16px] md:text-[20px]">
                  Никаких лишних инструментов
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col px-5 md:px-10 pt-7 justify-between gap-[100px]">
          <div className="border-black/10 flex flex-row justify-between gap-auto border-t">
            <p className="font-sf-regular text-[35px] md:text-[42px] mt-6 leading-11">E-circle меняет <br/> правила черчения</p>
            <p className="font-sf-regular hidden xl:flex text-[16px] py-1 px-3 h-8 rounded-[6px] text-black/40 mt-6 bg-[#F5F5F5]">Испытай разницу E-circle</p>
          </div>
          <div className="flex flex-col xl:flex-row justify-between gap-3">
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
                  isHolding={isHolding}
                />
              </div>
              <AnimatePresence>
                {!isPerfectStarted && (
                  <motion.div 
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="absolute inset-0 z-20 flex items-end justify-center mb-10 bg-white/10"
                  >
                    <motion.button 
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      onMouseDown={() => setIsHolding(true)}
                      onMouseUp={() => setIsHolding(false)}
                      onMouseLeave={() => setIsHolding(false)}
                      onTouchStart={() => setIsHolding(true)}
                      onTouchEnd={() => setIsHolding(false)}
                      className="font-sf-regular text-[18px] hover:bg-black/80 cursor-pointer py-6 px-8 rounded-[12px] text-white bg-black shadow-2xl transition-all"
                    >
                      Попробовать
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
        <div className="flex flex-col px-5 md:px-10 pt-7 justify-between gap-[100px]">
          <div className="border-black/10 flex flex-row justify-between gap-auto border-t">
            <div className="flex flex-col md:flex-row items-left justify-between gap-auto w-full">
              <p className="font-sf-regular w-0 md:w-200 text-[24px] mt-6 flex leading-7">Купите нашу продукцию <br/> на маркетплейсах</p>              
              <div className="flex flex-col mt-10 md:mt-10 md:flex-row gap-3 w-full">
                <div className="w-full h-[64px] rounded-[10px] border border-[#9313F2] flex items-center justify-center gap-3 text-[#9313F2] hover:bg-[#9313F2] hover:text-white transition-all duration-300 cursor-pointer">
                  <img src={wb} className="w-[22px] h-[22px]" />
                  <p className="font-medium text-center">Купить на Wildberries</p>
                </div>

                <div className="w-full h-[64px] rounded-[10px] bg-[#357DFF] flex items-center justify-center gap-3 text-white hover:bg-[#216dfa] transition-colors duration-300 cursor-pointer">
                  <img src={ozon} className="w-[22px] h-[22px]" />
                  <p className="font-medium text-center">Купить на OZON</p>
                </div>

                <div className="w-full h-[64px] rounded-[10px] bg-[#FFE23B] flex items-center justify-center gap-3 text-black hover:bg-[#E6CC35] transition-colors duration-300 cursor-pointer">
                  <img src={yam} className="w-[27px] h-[22px]" />
                  <p className="font-medium text-center">Купить на Яндекс Маркете</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="how" ref={howItWorksRef} className="bg-[#131313] justify-between gap-40 mt-30 pb-50 flex flex-col w-full rounded-t-[40px]">
        <div className="flex flex-col px-5 md:px-10 pt-7 justify-between gap-[100px]">
          <div className="flex flex-row justify-between gap-auto w-full">
            <p className="font-sf-regular text-[35px] md:text-[42px] mt-6 leading-11 text-white ">
              Как это <br/>работает
            </p>          
          </div>
          <div className="w-full mt-4 flex flex-col md:flex-row justify-between gap-3">
            <div className="h-[300px] w-full rounded-[12px] p-6 flex flex-col justify-between bg-white/6 relative overflow-hidden">
              <p className="text-white font-sf-regular flex text-[32px] leading-8">Соедини одно <br/> с другим</p>
              <div className="w-full justify-between items-center flex flex-row">
                <p className="text-white/40 font-sf-regular flex text-[20px]">
                  Просто соедини части циркуля
                </p>
                <img src={arrow} className="w-[29px] rotate-0 md:rotate-270"/>
              </div>
            </div>
            <div className="h-[300px] w-full rounded-[12px] p-6 flex flex-col justify-between bg-[#357DFF] relative overflow-hidden">
              <p className="text-white font-sf-regular flex text-[32px] leading-8">Тут же поставь <br/> радиус</p>
              <div className="w-full justify-between items-center flex flex-row">
                <img src={bg_card} className="absolute mb-50 w-[285px] h-[219px] z-[-10px]"/>
                <p className="text-white/40 font-sf-regular flex text-[20px]">
                  Используй встроенную линейку
                </p>
                <img src={arrow} className="w-[29px] rotate-0 md:rotate-270"/>
              </div>
            </div>
            <div className="h-[300px] w-full rounded-[12px] p-6 flex flex-col justify-between bg-white/6 relative overflow-hidden">
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
        <div className="flex flex-col px-5 md:px-10 pt-7 justify-between gap-[180px] md:gap-[80px]">
          <div className="border-white/10 flex flex-row justify-between gap-auto border-t">
            <p className="font-sf-regular text-[35px] md:text-[42px] mt-6 leading-11 text-white">Тебе нужен E-circle, если ты</p>
            <div className="group hidden md:flex border-white hover:bg-white border justify-center text-center mt-6 items-center rounded-full w-[162px] h-[162px] transition-all duration-500 cursor-pointer">
              <p className="text-white group-hover:text-black transition-colors duration-300 text-[16px]">
                Купить сейчас
              </p>
            </div>
          </div>
          <div className="w-full flex flex-col justify-between gap-8">
            <div className="border-white/10 w-full py-5 flex flex-col md:flex-row gap-15 md:gap-0 justify-between border-t relative overflow-hidden">
              <div className="flex flex-row justify-between gap-5">
                <p className="text-white font-sf-regular flex text-[32px]">
                  Школьник
                </p>
              </div>
              <p className="text-white/40 text-[20px] w-65 leading-6">Чтобы чертеж был гордостью, а не мучением. Выше оценка, меньше стресса</p>
              <img src={school} className="w-[75px] flex h-[75px]" />
            </div>
            <div className="border-white/10 w-full py-5 flex flex-col md:flex-row gap-15 md:gap-0 justify-between border-t relative overflow-hidden">
              <div className="flex flex-row justify-between gap-5">
                <p className="text-white font-sf-regular flex text-[32px]">
                  Студент
                </p>
              </div>
              <p className="text-white/40 text-[20px] w-65 leading-6">Точные чертежи, меньше исправлений, выше баллы и спокойнее сессия</p>
              <img src={student} className="w-[75px] flex h-[75px]" />
            </div>
            <div className="border-white/10 w-full py-5 flex flex-col md:flex-row gap-15 md:gap-0 justify-between border-t relative overflow-hidden">
              <div className="flex flex-row justify-between gap-5">
                <p className="text-white font-sf-regular flex text-[32px]">
                  Родитель
                </p>
              </div>
              <p className="text-white/40 text-[20px] w-65 leading-6">Чтобы подарить ребенку не просто циркуль, а уверенность и лучший результат</p>
              <img src={woman} className="w-[75px] flex mt-3 h-[75px]" />
            </div>
            <div className="border-white/10 w-full py-5 flex flex-col md:flex-row gap-15 md:gap-0 justify-between border-t relative overflow-hidden">
              <div className="flex flex-row justify-between gap-5">
                <p className="text-white font-sf-regular flex text-[32px]">
                  Художник
                </p>
              </div>
              <p className="text-white/40 text-[20px] w-65 leading-6">Когда важна каждая линия.  Инструмент, который даёт контроль над формой и позволяет сосредоточиться на творчестве</p>
              <img src={man} className="w-[75px] mt-3 flex h-[75px]" />
            </div>
          </div>
        </div>
        <div id="catalog" className="flex flex-col px-5 md:px-10 pt-7 justify-between gap-[120px]">
          <div className="border-white/10 flex flex-row justify-between gap-auto border-t">
            <p className="font-sf-regular text-[35px] md:text-[42px] mt-6 leading-11 text-white">Ассортимент</p>
            <div className="mt-4 flex flex-row justify-between gap-1">
              <img 
                src={arrow} 
                alt="Prev"
                onClick={() => canScrollLeft && handleScroll("left")}
                className={`w-[30px] h-[30px] md:w-[29px] md:h-[29px] rotate-90 transition-all duration-300 ${
                  canScrollLeft ? "cursor-pointer opacity-100" : "opacity-20 grayscale"
                }`}
              />
              <img 
                src={arrow} 
                alt="Next"
                onClick={() => canScrollRight && handleScroll("right")}
                className={`w-[30px] h-[30px] md:w-[29px] md:h-[29px] rotate-270 transition-all duration-300 ${
                  canScrollRight ? "cursor-pointer opacity-100" : "opacity-20 grayscale"
                }`}
              />
            </div>
          </div>
          <div 
            ref={scrollRef}
            className="w-full flex flex-row gap-3 overflow-x-auto no-scrollbar pb-10"
          >
            <div className="min-w-[280px] md:min-w-[400px] h-[400px] rounded-[12px] p-6 flex flex-col justify-between bg-white/5 flex-shrink-0">
            </div>
            <div className="min-w-[280px] md:min-w-[400px] h-[400px] rounded-[12px] p-6 flex flex-col justify-between bg-white/5 flex-shrink-0">
            </div>
            <div className="min-w-[280px] md:min-w-[400px] h-[400px] rounded-[12px] p-6 flex flex-col justify-between bg-white/5 flex-shrink-0">
            </div>
            <div className="min-w-[280px] md:min-w-[400px] h-[400px] rounded-[12px] p-6 flex flex-col justify-between bg-white/5 flex-shrink-0">
            </div>
            <div className="min-w-[280px] md:min-w-[400px] h-[400px] rounded-[12px] p-6 flex flex-col justify-between bg-white/5 flex-shrink-0">
            </div>
            <div className="min-w-[280px] md:min-w-[400px] h-[400px] rounded-[12px] p-6 flex flex-col justify-between bg-white/5 flex-shrink-0">
            </div>
            <div className="min-w-[280px] md:min-w-[400px] h-[400px] rounded-[12px] p-6 flex flex-col justify-between bg-white/5 flex-shrink-0">
            </div>
            <div className="min-w-[280px] md:min-w-[400px] h-[400px] rounded-[12px] p-6 flex flex-col justify-between bg-white/5 flex-shrink-0">
            </div>
            <div className="min-w-[280px] md:min-w-[400px] h-[400px] rounded-[12px] p-6 flex flex-col justify-between bg-white/5 flex-shrink-0">
            </div>
          </div>
        </div>
        <div className="flex flex-col px-5 md:px-10 pt-7 justify-between">
          <div className="border-white/10 flex flex-col md:flex-row justify-between border-t">
            <div className="flex flex-col md:flex-row items-left justify-between w-full">
              <div className=" flex-col hidden md:flex mt-10">
                <img src={wb_ozon} className="w-[299px]"/>
                <p className="font-sf-regular text-[20px] text-white mt-9 flex leading-7">Вы можете приобрести нашу продукцию<br/> на маркетплейсах OZON и Wildberries.</p>
              </div>
              <div className="flex flex-col md:flex-row gap-3 w-full">
                <div className="w-full h-[64px] rounded-[10px] border border-white flex items-center justify-center gap-3 text-white hover:bg-white hover:text-black transition-all duration-300 cursor-pointer">
                  <img src={wb} className="w-[22px] h-[22px]" />
                  <p className="font-medium text-center">Купить на Wildberries</p>
                </div>

                <div className="w-full h-[64px] rounded-[10px] bg-[#357DFF] flex items-center justify-center gap-3 text-white hover:bg-[#216dfa] transition-colors duration-300 cursor-pointer">
                  <img src={ozon} className="w-[22px] h-[22px]" />
                  <p className="font-medium text-center">Купить на OZON</p>
                </div>

                <div className="w-full h-[64px] rounded-[10px] bg-[#FFE23B] flex items-center justify-center gap-3 text-black hover:bg-[#E6CC35] transition-colors duration-300 cursor-pointer">
                  <img src={yam} className="w-[27px] h-[22px]" />
                  <p className="font-medium text-center">Купить на Яндекс Маркете</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="wholesale" ref={wholesaleRef} className="bg-white mt-[-100px] justify-between gap-30 flex flex-col w-full h-full rounded-t-[40px]">
        <div className="flex flex-col px-5 md:px-10 pt-7 justify-between gap-[80px]">
          <div>
            <div className="flex flex-row justify-between">
              <p className="font-sf-regular text-[35px] md:text-[42px] mt-6 leading-11">Оптовым <br/>покупателям</p>
              <p className="font-sf-regular hidden md:flex text-[16px] py-1 px-3 h-8 rounded-[6px] text-black/40 mt-6 bg-[#F5F5F5]">E-circle для бизнеса</p>
            </div>
            <p className="text-[22px] mt-17 leading-6"><span className="text-[#357DFF]">Станьте первым,</span> кто предложит на рынке инновационный <br/> электрический циркуль. Высокая маржинальность и растущий спрос.</p>
          </div>
          <div className="w-full flex flex-row justify-between">
            <div className="max-w-[600px] bg-white font-sf-regular">
              <ContactForm />
            </div>
            <div className="hidden md:flex">
              <p className="text-[35px] text-black cursor-pointer underline">e-circle@gmail.com</p>
              <p className="text-black/30 text-[18px]">Свяжитесь с нами</p>
            </div>
          </div>
        </div>
        <div className="flex flex-row px-5 md:px-10 pt-7 justify-between">
          <div className="border-black/10 w-full justify-between flex flex-col md:flex-row border-t">
            <div className="flex flex-row justify-between gap-auto mr-80">
              <p className="font-sf-regular text-[35px] md:text-[42px] mt-6 leading-11 text-black">Что вы получаете, став нашим партнером</p>
            </div>
            <div className="w-full flex flex-col mt-20 md:mt-0 justify-between gap-12">
              <div className="w-full py-4 flex flex-col gap-20 md:gap-0 md:flex-row justify-between relative overflow-hidden">
                <div className="flex flex-row justify-between gap-5">
                  <p className="text-black font-sf-regular flex text-[32px]">
                    Эксклюзивность
                  </p>
                </div>
                <p className="text-black/40 text-[20px] w-65 leading-6">Новый товар на категории вашего рынка.</p>
              </div>
              <div className="border-black/10 w-full py-4 gap-20 md:gap-0 flex flex-col md:flex-row justify-between border-t relative overflow-hidden">
                <div className="flex flex-row justify-between gap-5">
                  <p className="text-black font-sf-regular flex text-[32px]">
                    Рекламная поддержка
                  </p>
                </div>
                <p className="text-black/40 text-[20px] w-65 leading-6">Мы создаем ажиотаж через контентную рекламу, облегчая ваши продажи.</p>
              </div>
              <div className="border-black/10 w-full py-4 flex flex-col gap-20 md:gap-0 md:flex-row justify-between border-t relative overflow-hidden">
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
            className="w-full hidden md:flex h-full object-cover object-top" 
            alt="Background Footer"
          />
        </div>  
        <div className="flex flex-col px-5 md:px-10 pt-7 justify-between z-10 gap-[100px]">
          <div className="flex flex-col md:flex-row justify-between gap-auto w-full">
            <div className="flex flex-col justify-between gap-12">
              <img src={logo_sm} className="w-30 flex md:hidden justify-start"/>
              <p className="font-sf-regular text-[35px] md:text-[42px] mt-6 leading-11 text-white">Идеальный круг <br/>— с первой кнопки</p>
              <div className="flex flex-col md:flex-row items-left text-center mt-7 justify-between gap-2">
                <div className="flex flex-col md:flex-row gap-3 w-full">
                  <div className="w-full h-[64px] rounded-[10px] border border-white flex items-center justify-center gap-3 text-white hover:bg-white hover:text-black transition-all duration-300 cursor-pointer">
                    <img src={wb} className="w-[22px] h-[22px]" />
                    <p className="font-medium text-center">Купить на Wildberries</p>
                  </div>
                  <div className="w-full h-[64px] rounded-[10px] bg-[#357DFF] flex items-center justify-center gap-3 text-white hover:bg-[#216dfa] transition-colors duration-300 cursor-pointer">
                    <img src={ozon} className="w-[22px] h-[22px]" />
                    <p className="font-medium text-center">Купить на OZON</p>
                  </div>
                  <div className="w-full h-[64px] rounded-[10px] bg-[#FFE23B] flex items-center justify-center gap-3 text-black hover:bg-[#E6CC35] transition-colors duration-300 cursor-pointer">
                    <img src={yam} className="w-[27px] h-[22px]" />
                    <p className="font-medium text-center">Купить на Яндекс Маркете</p>
                  </div>
                </div>
              </div>
            </div>
            <img src={logo_sm} className="w-45 h-25 justify-start hidden md:flex mb-25"/>
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
              <p className="text-white/40 hover:text-white transition-colors cursor-pointer">Email</p>
              <a href="https://t.me/tru_blog" className="text-white/40 hover:text-white transition-colors cursor-pointer">Telegram</a>
              <p className="text-white/40 hover:text-white transition-colors cursor-pointer">ВКонтакте</p>
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-end justify-end">
              <img src={qr2} className="flex md:absolute mb-14 w-50 h-50 rounded-lg"/>
              <a href="mailto:email@example.ru" className="text-[27px] md:text-[32px] text-white font-sf-medium underline leading-none">
                e-circle@example.ru
              </a>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-[14px] text-white/40 border-t border-white/5">
            <p>E-circle</p>
            <div className="flex flex-col md:flex-row gap-10">
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
