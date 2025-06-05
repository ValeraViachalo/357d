import React, { useState } from "react";

import "./Availability.scss";
import clsx from "clsx";
import { LinkAnim } from "@/utils/LinkAnim/LinkAnim";
import { TableHeader } from "./TableHeader/TableHeader";
// import { Filters } from "./Filters/Filters";
import { AnimatePresence, motion } from "framer-motion";
import { anim, ProjectsAnim } from "@/lib/helpers/anim";
import { NewFilters } from "./NewFilters/NewFilters";

export default function Availability({ data }) {
  const [projectsList, setProjectsList] = useState(data?.lists);
  const [activeSort, setActiveSort] = useState({
    value: null,
    revert: false,
  });
  const [activeFilters, setActiveFilters] = useState({
    type: "",
    bedrooms: "",
  });

  return (
    <section className="aviability container" id="availability">
      <div className="top">
        <span className="aviability__title super-text">{data.title}</span>
      </div>
      {/* <Filters
          data={data}
          worksList={projectsList}
          setWorksList={setProjectsList}
          activeFilters={activeFilters}
          setActiveFilters={setActiveFilters}
        /> */}
      <NewFilters
        data={data}
        worksList={projectsList}
        setWorksList={setProjectsList}
        activeFilters={activeFilters}
        setActiveFilters={setActiveFilters}
      />
      <Table
        data={data}
        projectsList={projectsList}
        setProjectsList={setProjectsList}
        activeSort={activeSort}
        setActiveSort={setActiveSort}
      />
    </section>
  );
}

const Table = ({
  data,
  projectsList,
  setProjectsList,
  activeSort,
  setActiveSort,
}) => {
  return (
    <div className="table">
      <TableHeader
        tableHeader={data?.tableHeader}
        projectsList={projectsList}
        setProjectsList={setProjectsList}
        activeSort={activeSort}
        setActiveSort={setActiveSort}
      />
      <AnimatePresence mode="popLayout">
        {projectsList.map((data, index) => {
          const id = `${projectsList.length}-${activeSort.value}-${activeSort.revert}--${index}`;
          return <Row key={id} data={data} />;
        })}
        {data?.bottom.active && (
          <div className="bottom table-grid">
            <motion.h2>
              <motion.span
                {...anim(ProjectsAnim.card)}
                key={`bottom-${projectsList.length}`}
              >
                {projectsList.length}{" "}
              </motion.span>
              {data?.bottom.unitsText}
            </motion.h2>
            <h2 className="bottom-right">
              <span className="icon icon--fire"></span>
              {data?.bottom.right}
            </h2>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Row = ({ data, ...rest }) => {
  return (
    <motion.div
      className={clsx("table-row table-grid", {
        "table-row--nonavialable": !data?.avialable,
      })}
      {...rest}
      {...anim(ProjectsAnim.card)}
    >
      <span className="background"></span>
      <span>{data?.type}</span>
      <LinkAnim
        text={data?.floorPlan?.text}
        href={data?.floorPlan?.href}
        download
        target="_blank"
        icon="/images/icons/download-icon.svg"
      />
      <span>{data?.bedrooms.value}</span>
      <span>{data?.bathroom.value}</span>
      <span>{data?.floor.value}</span>
      <span>
        {data?.area.value} {data?.area.unit}
      </span>
      <span>
        {data?.price.unit}
        {data?.price.value}
      </span>
    </motion.div>
  );
};
