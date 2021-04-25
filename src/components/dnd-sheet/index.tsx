import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export type ItemType = { id: string; className: string; tint: any };
export type GroupType = { items: Array<any>; id: string; label: string };
export interface Props {
  items: Array<GroupType>;
  setItems: (p: Array<GroupType>) => void;
  onChange: (p: Array<GroupType>) => void;
  className: string;
}

const DndSheet = ({ items, setItems, onChange, className }: Props) => {
  const [groups, setGroups] = useState<any>({});

  const buildAndSave = (items: Array<GroupType>) => {
    const groups: any = {};
    for (let i = 0; i < Object.keys(items).length; ++i) {
      const currentGroup = items[i];
      groups[currentGroup.id] = i;
    }
    // Set the data.
    setItems(items);
    // Makes the groups searchable via their id.
    setGroups(groups);
  };

  useEffect(() => {
    // Mock an API call.
    buildAndSave(items);
  }, []);

  return (
    <DragDropContext
      onDragEnd={(result) => {
        const { destination, draggableId, source, type } = result;

        if (!destination) {
          return;
        }

        if (
          destination.droppableId === source.droppableId &&
          destination.index === source.index
        ) {
          return;
        }

        if ("group" === type) {
          const sourceIndex = source.index;
          const targetIndex = destination.index;

          const workValue = items.slice();
          const [deletedItem] = workValue.splice(sourceIndex, 1);
          workValue.splice(targetIndex, 0, deletedItem);

          buildAndSave(workValue);

          return;
        }

        const sourceDroppableIndex = groups[source.droppableId];
        const targetDroppableIndex = groups[destination.droppableId];
        const sourceItems = items[sourceDroppableIndex].items.slice();
        const targetItems =
          source.droppableId !== destination.droppableId
            ? items[targetDroppableIndex].items.slice()
            : sourceItems;

        // Pull the item from the source.
        const [deletedItem] = sourceItems.splice(source.index, 1);
        targetItems.splice(destination.index, 0, deletedItem);

        const workValue = items.slice();
        workValue[sourceDroppableIndex] = {
          ...items[sourceDroppableIndex],
          items: sourceItems,
        };
        workValue[targetDroppableIndex] = {
          ...items[targetDroppableIndex],
          items: targetItems,
        };

        setItems(workValue);
        onChange(workValue);
      }}
    >
      <Droppable droppableId="ROOT" type="group">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={className}
          >
            {items.map((item, index) => (
              <Draggable draggableId={item.id} key={item.id} index={index}>
                {(provided) => (
                  <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                  >
                    <DroppableList key={item.id} {...item} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

const DroppableList = ({ id, items, label }: GroupType) => {
  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          <div>
            <div className="bg-gray-500 rounded-t-md">{label}</div>
            <div className="bg-gray-500 rounded-b-md">
              <ul className="list">
                {items.filter(Boolean).map((item, index) => (
                  <li className={`${item.className} w-full`} key={item.id}>
                    <Draggable draggableId={item.id} index={index}>
                      {(provided) => (
                        <div
                          className={
                            item.className || "bg-blue-400 rounded-md mb-1 mx-1"
                          }
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          {item.label}
                        </div>
                      )}
                    </Draggable>
                  </li>
                ))}
                {provided.placeholder}
              </ul>
            </div>
          </div>
        </div>
      )}
    </Droppable>
  );
};

export default DndSheet;
