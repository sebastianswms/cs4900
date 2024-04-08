import "./index.css";
import React from "react";

function CategoryLayoutForm({
  group,
  categories,
  setCategories,
  subCategories,
  setSubCategories,
  headers,
  data,
  setData,
}) {
  const updateArray = (index, value, arr, setArr) => {
    const tempArray = [...arr];
    tempArray[index] = value;
    setArr(tempArray);
  };

  const addItem = (setSubCategories, setHeaders) => {
    setSubCategories((prevData) => [...prevData, ""]);
    setHeaders((prevData) => [...prevData, ""]);
  };

  const removeItem = (
    subCategories,
    headers,
    setSubCategories,
    setHeaders,
    index
  ) => {
    const s = [...subCategories];
    const h = [...headers];
    s.splice(index, 1);
    h.splice(index, 1);
    setSubCategories(s);
    setHeaders(h);
  };

  return (
    <div className="layout-form-container">
      <div className="layout-form-title">
        <h4>Group {group}:</h4>
      </div>
      <div className="layout-form-context">
        <div style={{ paddingRight: "0.25em" }}>
          <div className="left-justified-div">Category </div>
          <div className="left-justified-div">Label </div>
          <div className="left-justified-div">Data </div>
        </div>
        <div>
          <div>
            <input
              id={"category-" + group}
              name={"category-" + group}
              value={categories[group]}
              onChange={(e) =>
                updateArray(group, e.target.value, categories, setCategories)
              }
              style={{
                width: "100%",
                backgroundColor: "#4660af",
                color: "white",
                padding: "2px",
                border: "1px solid black",
              }}
            ></input>
          </div>
          <div>
            <div style={{ display: "flex" }}>
              {subCategories.map((label, index) => {
                return (
                  <div key={index}>
                    <div>
                      <input
                        id={"label-" + group + index}
                        name={"label-" + group + index}
                        value={label}
                        onChange={(e) =>
                          updateArray(
                            index,
                            e.target.value,
                            subCategories,
                            setSubCategories
                          )
                        }
                        style={{
                          backgroundColor: "#4660af",
                          color: "white",
                          padding: "2px",
                          border: "1px solid black",
                          width: "100%",
                        }}
                      />
                    </div>
                    <div>
                      <select
                        id={"label-" + group + index}
                        name={"label-" + group + index}
                        value={data[index]}
                        onChange={(e) =>
                          updateArray(index, e.target.value, data, setData)
                        }
                      >
                        <option value="">-- select data --</option>
                        {headers.map((header) => (
                          <option key={header} value={header}>
                            {header}
                          </option>
                        ))}
                      </select>
                    </div>
                    {subCategories.length > 1 ? (
                      <button
                        onClick={() =>
                          removeItem(
                            subCategories,
                            data,
                            setSubCategories,
                            setData,
                            index
                          )
                        }
                      >
                        ❌Remove
                      </button>
                    ) : (
                      <></>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="rotated-div">
          <button
            className="button-vertical"
            onClick={() => addItem(setSubCategories, setData)}
          >
            <b>+</b>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CategoryLayoutForm;
