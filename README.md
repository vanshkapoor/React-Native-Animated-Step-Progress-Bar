# React Native Animated Step Progress Bar



https://github.com/vanshkapoor/React-Native-Animated-Step-Progress-Bar/assets/31445077/160edfce-2d23-4d96-8ff3-6ffda3b63273



### How to use
import the component

`
import ProgressBar from './main';
`

create your barItems array:
`
 const barItems = [
  {
    index: 1,
    title: 'Step 1',
  },
  {
    index: 2,
    title: 'Step 2',
  },
  {
    index: 3,
    title: 'Step 3',
  }
],
`


Pass the following parameters to the component


> <ProgressBar 
>   barItems={barItems}
>   activeIndex={activeIndex}
>   barColor={'red'}
>   unfilledIconColor={'black'}
>   unfilledBarColor={'grey'}
> />




The component has a lot of scope for improvement and if anybody is interested to contribute, then feel free to raise MR's. I'm actively working on this component and will be releasing a node module for it soon!
