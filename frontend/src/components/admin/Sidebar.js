import React from "react";
import styles from "./Sidebar.module.css";
import { MdDashboard } from "react-icons/md";
import { TreeItem, TreeView } from "@mui/x-tree-view";
import { SiShopware } from "react-icons/si";
import AddIcon from "@mui/icons-material/Add";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { Link } from "react-router-dom";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import RateReviewIcon from "@mui/icons-material/RateReview";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ImportExportIcon from "@mui/icons-material/ImportExport";
const Sidebar = () => {
  return (
    <div className={styles["sidebar-main"]}>
      <Link to="/">
        <div className={styles["sidebar-logo"]}>
          <SiShopware />
          <p>Shoppy</p>
        </div>
      </Link>
      <Link to="/admin/dashboard">
        <div>
          <MdDashboard />
          <p> Dashboard</p>
        </div>
      </Link>
      <Link>
        <TreeView
          className={styles["tree-view"]}
          defaultExpandIcon={<ImportExportIcon />}
          defaultCollapseIcon={<ExpandMoreIcon />}
        >
          <TreeItem
            nodeId="1"
            label="Products"
            className={styles["tree-items"]}
          >
            <Link to="/admin/products">
              <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
            </Link>
            <Link to="/admin/create/product">
              <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
            </Link>
          </TreeItem>
        </TreeView>
      </Link>
      <Link to="/admin/orders">
        <div>
          <ListAltIcon /> <p>Orders</p>
        </div>
      </Link>

      <Link to="/admin/users">
        <div>
          <PeopleAltIcon /> <p>Users</p>
        </div>
      </Link>
      <Link to="/admin/reviews">
        <div>
          <RateReviewIcon /> <p>Reviews</p>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
