//basically I need to use my own color in the utils/_variables.scss when i'm creating my own components
// and hijack MUI color pallet system for all of theirs, so I don't have to hack each of their ellement to have
// the correct color

// use this to restyle = http://mcg.mbitson.com/#!?mcgpalette0=%233f51b5

var primary = {
  50: "#e1f5fe",
  100: "#b3e5fc",
  200: "#81d4fa",
  300: "#4fc3f7",
  400: "#29b6f6",
  500: "#03a9f4",
  600: "#03a2f3",
  700: "#0298f1",
  800: "#028fef",
  900: "#017eec",
  A100: "#ffffff",
  A200: "#e0efff",
  A400: "#add4ff",
  A700: "#93c7ff",
  contrastDefaultColor: "light"
};

var accent = {
  50: "#eff2f3",
  100: "#d7dee1",
  200: "#bcc8ce",
  300: "#a1b1ba",
  400: "#8ca1ab",
  500: "#78909c",
  600: "#708894",
  700: "#657d8a",
  800: "#5b7380",
  900: "#48616e",
  A100: "#78909c",
  A200: "#708894",
  A400: "#657d8a",
  A700: "#5b7380",
  contrastDefaultColor: "dark"
};

export { primary, accent };
