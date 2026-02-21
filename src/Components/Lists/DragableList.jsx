import { DragDropProvider } from "@dnd-kit/react";
import {useSortable} from '@dnd-kit/react/sortable';
import {move} from '@dnd-kit/helpers';
import { useState } from "react";

const DragableListItem = ({id,index}) => {
  const {ref} = useSortable({id,index});
  return (<button ref={ref}>Item {id}</button>)
}

const styles = {display: 'inline-flex', flexDirection: 'column', gap: 20};
const DragableList = ({ initialItems }) => {
  const [items,setItems] = useState([...initialItems]);

  return (
    <DragDropProvider onDragEnd={(e) => setItems((items) => move(items,e))}>
      <div style={styles}>
        {items.map((id,index) => {
          return (
            <DragableListItem key={id} id={id} index={index} />
          )
        })}
      </div>
    </DragDropProvider>
  );
}

export default DragableList;