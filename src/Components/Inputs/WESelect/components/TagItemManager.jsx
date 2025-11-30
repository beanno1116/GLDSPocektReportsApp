import { Children, cloneElement, useState } from 'react';
import { Transition } from 'react-transition-group';

import styles from '../weSelect.module.css';
const duration = 300;
const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
  padding: 20,
  display: "inline-block",
  backgroundColor: "#b3d0ff"
};

const transitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
  exiting: { opacity: 1 },
  exited: { opacity: 0 },
};

const TagItemManager = ({ Tag, children }) => {
  const childrenArray = Children.toArray(children);
  const [childrenState, setChildrenState] = useState([]);

  const test = () => {
    let initialState = [];
    for (let i = 0; i < childrenArray.length; i++) {
      const child = childrenArray[i];
      const retObj = {};
      retObj[child.props.value] = true;
      initialState = [...initialState, retObj];
    }
    let tmp = [...initialState];
    // ;
    setChildrenState([...initialState]);
  }
  test();
  return (
    <div className={styles.tags}>
      {Children.map(childrenArray, (child, index) => {
        ;
        let tmpC = childrenState.filter(cs => Object.keys(cs).filter(k => k === child.props.value));


        return (
          <Transition in={childrenState.filter(cs => Object.keys(cs).filter(k => k === child.props.value))} timeout={300}>
            {(state) => {
              let style = {
                ...defaultStyle,
                ...transitionStyles[state]
              }
              cloneElement(child, { style }, null);

            }}

          </Transition>
        );
      })}
    </div>
  );
}

export default TagItemManager;