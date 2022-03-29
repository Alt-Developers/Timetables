// import { motion } from "framer-motion";
// import { useState } from "react";
// import { useEffect } from "react";
// import { useSelector } from "react-redux";

// const TimetableDay = props => {
//   const [hovering, setHovering] = useState(false);
//   const format = useSelector(state => state.account.format);
//   const language = useSelector(state => state.account.language);
//   let isCurrentDay;

//   useEffect(() => {
//     props.liftHover(hovering);
//   }, [hovering]);

//   if (props.identifier.curClass.day === props.weekday[2].toLowerCase()) {
//     isCurrentDay = true;
//   }

//   return (
//     <>
//       <div
//         className={`${props.weekday[0]} weekdays ${props.blurred}`}
//         onMouseEnter={() => {
//           setHovering(true);
//         }}
//         onMouseLeave={() => {
//           setHovering(false);
//         }}>
//         {props.weekday[1]}
//       </div>
//       <div className={`periods__morning ${props.blurred}`}>
//         {props.data.slice(0, 4).map((period, index) => (
//           <motion.h3
//             initial={{ opacity: 0 }}
//             animate={
//               !props.searched.includes(
//                 format[props.program][period].name.toLowerCase()
//               )
//                 ? { opacity: 0 }
//                 : { opacity: 1 }
//             }
//             transition={{ delay: 0.35 }}
//             className={`${
//               !props.searched.includes(
//                 format[props.program][period].name.toLowerCase()
//               )
//                 ? "hidden"
//                 : "searched"
//             }
//       `}
//             style={
//               isCurrentDay && index === props.identifier.curClass.index
//                 ? {
//                     color: props.highlightColor,
//                     textShadow:
//                       window.matchMedia &&
//                       window.matchMedia("(prefers-color-scheme: dark)").matches
//                         ? `0px 0px 10px ${props.highlightColor}`
//                         : "none",
//                   }
//                 : {}
//             }
//             key={Math.random()}>
//             {format[props.program][period].name.length > 11 ? (
//               <>
//                 {format[props.program][period].name.split(" ")[0]} <br />
//                 {format[props.program][period].name.split(" ")[1]}
//               </>
//             ) : (
//               format[props.program][period].name
//             )}
//           </motion.h3>
//         ))}
//       </div>
//       <div
//         className={`t-r1c3`}
//         style={
//           props.identifier.curClass.index === 3.5
//             ? {
//                 color: `${props.highlightColor} !important`,
//                 textShadow: `0px 0px 10px ${props.highlightColor}`,
//                 gridColumn: "3 /  4",
//                 gridRow: "2 / span 5",
//               }
//             : { gridColumn: "3 /  4", gridRow: "2 / span 5" }
//         }>
//         <h3
//           style={
//             props.identifier.curClass.index === 3.5
//               ? {
//                   color: props.highlightColor,
//                   textShadow: `0px 0px 10px ${props.highlightColor}`,
//                 }
//               : {
//                   color: `var(--font-color)`,
//                   textShadow: `none`,
//                 }
//           }>
//           {language === "EN" ? "Lunch Break" : "พักกลางวัน"}
//         </h3>
//       </div>
//       <div className={`periods__afternoon ${props.blurred}`}>
//         {props.data.slice(4, 7).map((period, index) => (
//           <motion.h3
//             initial={{ opacity: 0 }}
//             animate={
//               !props.searched.includes(
//                 format[props.program][period].name.toLowerCase()
//               )
//                 ? { opacity: 0 }
//                 : { opacity: 1 }
//             }
//             className={`${
//               !props.searched.includes(
//                 format[props.program][period].name.toLowerCase()
//               )
//                 ? "hidden"
//                 : "searched"
//             }`}
//             style={
//               isCurrentDay && index + 4 === props.identifier.curClass.index
//                 ? {
//                     color: props.highlightColor,
//                     textShadow: `0px 0px 10px ${props.highlightColor}`,
//                   }
//                 : {}
//             }
//             transition={{ delay: 0.35 }}
//             key={Math.random()}>
//             {format[props.program][period].name.length > 11 ? (
//               <>
//                 {format[props.program][period].name.split(" ")[0]} <br />
//                 {format[props.program][period].name.split(" ")[1]}
//               </>
//             ) : (
//               format[props.program][period].name
//             )}
//           </motion.h3>
//         ))}
//       </div>
//     </>
//   );
// };

// export default TimetableDay;
