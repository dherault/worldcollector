import { mergeTheme } from 'honorable'
import defaultTheme from 'honorable-theme-default'
import mpRecipe from 'honorable-recipe-mp'
import gapRecipe from 'honorable-recipe-gap'
import flexpad from 'flexpad'

const borderRadii = {
  none: 0,
  medium: 3,
  large: 6,
}

const yellow = {
  900: '#74480F',
  800: '#89580A',
  700: '#A67202',
  600: '#D19F00',
  500: '#EFCA00',
  400: '#FFE60D',
  300: '#FFF541',
  200: '#FFFE86',
  100: '#FEFFC1',
  50: '#FFFFE7',
}

const green = {
  950: '#032117',
  900: '#053827',
  850: '#074F37',
  800: '#0A6B4A',
  700: '#0F996A',
  600: '#13C386',
  500: '#17E8A0',
  400: '#3CECAF',
  300: '#6AF1C2',
  200: '#99F5D5',
  100: '#C7FAE8',
  50: '#F1FEF9',
}

const red = {
  950: '#130205',
  900: '#200308',
  850: '#38060E',
  800: '#660A19',
  700: '#8B0E23',
  600: '#BA1239',
  500: '#E81748',
  400: '#ED456A',
  300: '#F2788D',
  200: '#F599A8',
  100: '#FAC7D0',
  50: '#FFF0F2',
}

const grey = {
  50: '#f6f6f7',
  100: '#e0e2e7',
  200: '#c1c2ce',
  300: '#9a9cae',
  400: '#75768c',
  500: '#5a5b72',
  600: '#47485a',
  700: '#3b3b4a',
  800: '#32323d',
  900: '#101013',
}

export default mergeTheme(defaultTheme, {
  name: 'WorldCollector',
  mode: 'dark',
  stylesheet: {
    html: [
      {
        overscrollBehaviorX: 'none',
      },
    ],
    body: [
      {
        overflow: 'hidden',
        fontFamily: 'Formular, sans-serif',
        overscrollBehaviorX: 'none',
      },
    ],
    a: [
      {
        color: 'white',
      },
    ],
  },
  colors: {
    primary: 'white',
    background: 'grey.900',
    gold: 'linear-gradient(145deg, rgba(239,202,0,1) 0%, rgba(209,159,0,1) 45%, rgba(209,159,0,1) 55%, rgba(239,202,0,1) 100%)',
    rainbow: 'linear-gradient(180deg,hsla(0,0%,100%,.2),hsla(0,0%,100%,.2)),linear-gradient(145deg,#0fa,#0af 25%,#9f6eff 50%,#fd66cb 75%,#fa0)',
    yellow,
    green,
    red,
    grey,
  },
  global: [
    mpRecipe(),
    gapRecipe(),
    ({ xflex }: any) => typeof xflex === 'string' && flexpad(xflex),
    ({ bold }: any) => bold && {
      fontWeight: 'bold',
    },
    ({ italic }: any) => italic && {
      fontStyle: 'italic',
    },
    ({ truncate }: any) => truncate && {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },
    ({ borderRadius }: any) => typeof borderRadius === 'string' && typeof borderRadii[borderRadius as keyof typeof borderRadii] !== 'undefined' && {
      borderRadius: borderRadii[borderRadius as keyof typeof borderRadii],
    },
  ],
  // IconButton: {
  //   Root: [
  //     ({ large }: any) => large && {
  //       padding: 16,
  //     },
  //     ({ ghost }: any) => ghost && {
  //       elevation: 0,
  //     },
  //   ],
  // },
  // Input: {
  //   Root: [
  //     ({ large }: any) => large && {
  //       minHeight: 48,
  //       fontSize: 18,
  //     },
  //   ],
  //   StartIcon: [
  //     ({ large }: any) => large && {
  //       marginLeft: 8,
  //       marginRight: 6,
  //     },
  //   ],
  // },
  // Flex: {
  //   Root: [
  //     ({ column }: any) => column && {
  //       flexDirection: 'column',
  //     },
  //     ({ center }: any) => center && {
  //       alignItems: 'center',
  //       justifyContent: 'center',
  //     },
  //   ],
  // },
  // P: {
  //   Root: [
  //     ({ lead }: any) => lead && {
  //       fontSize: 24,
  //     },
  //     ({ caption }: any) => caption && {
  //       fontSize: 12,
  //     },
  //   ],
  // },
  Ul: {
    Root: [
      {
        margin: 0,
      },
    ],
  },
  Ol: {
    Root: [
      {
        margin: 0,
      },
    ],
  },
  Label: {
    Root: [
      {
        marginBottom: 0,
      },
    ],
  },
})
