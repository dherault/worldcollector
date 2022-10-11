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

export default mergeTheme(defaultTheme, {
  name: 'WorldCollector',
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
  },
  colors: {
    primary: '#4864D5',
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
