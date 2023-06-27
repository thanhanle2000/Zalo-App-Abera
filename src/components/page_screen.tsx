import Drawer from "@mui/material/Drawer";
import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { AnimationRoutes } from "zmp-ui";
import { InforHomeModel } from "../core/model/home/infor_home_model";
import {
  BottomToTop,
  CustomHeader,
  FooterHome,
  SliderCart,
} from "../path/page/component";
import {
  BlogPage,
  CartItem,
  CartPage,
  CatePage,
  ContactPage,
  CustomerSupportPage,
  Detail,
  DetailBlogPage,
  HomePage,
  InfoPage,
  NumberCart,
  OrderSuccess,
  ProductAll,
  SearchResultPage,
  SvgBody,
} from "../path/page/page";

interface Props {
  inforHome: InforHomeModel;
  idActives: number;
}
const PageScreen: React.FC<Props> = ({ inforHome, idActives }) => {
  // setState
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [state, setState] = useState({
    right: false,
  });
  const [isScroll, setIsScroll] = useState(false);
  const [isCheck, setIsCheck] = useState(true);
  const [isReachedTop, setIsReachedTop] = useState(false);

  // gán giá trị
  let prevScrollTop = useState(0)[0];

  // toggerDrawer
  const toggleDrawer = (anchor, open) => () => {
    setState({ ...state, [anchor]: open });
  };

  // close Drawer
  const handleCloseDrawer = () => {
    setState({ ...state, right: false });
  };

  // handle scroll
  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const reachedTop = scrollTop === 0;
    const reachedBottom =
      scrollTop + window.innerHeight === document.documentElement.offsetHeight;
    const scrolling = !reachedTop && !reachedBottom;

    if (reachedTop && !isReachedTop && !scrolling) {
      // top
      setIsCheck(true);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      setIsScroll(false); // Turn off isScroll when scrolling to the top
      setShowScrollToTop(false);
      setIsReachedTop(true);
    } else if (!reachedTop && isReachedTop) {
      // Move away from the top
      setIsReachedTop(false);
    }

    if (scrollTop < prevScrollTop) {
      // scroll up
      setIsScroll(false);
    } else if (scrollTop > prevScrollTop && scrollTop > 40) {
      // scroll down
      setShowScrollToTop(true);
      setIsScroll(true);
      setIsCheck(false);
    }

    prevScrollTop = scrollTop;
  };

  // useEffect
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div style={{ marginTop: "36px" }}>
      <div
        className={
          isScroll
            ? "header-container hidden-header"
            : "header-container visible-header"
        }
        id="headerContainer"
      >
        <CustomHeader
          inforHome={inforHome}
          idActives={idActives}
          isCheck={isCheck}
        />
      </div>
      <SvgBody />
      <AnimationRoutes>
        <Route path="/" element={<HomePage />} />
        <Route path="/index_cate" element={<CatePage />} />
        <Route path="/index_detail" element={<Detail />} />
        <Route path="/index_cart" element={<CartPage />} />
        <Route path="/index_product_all" element={<ProductAll />} />
        <Route path="/index_contact" element={<ContactPage />} />
        <Route path="/index_blog" element={<BlogPage />} />
        <Route path="/index_detail_blog" element={<DetailBlogPage />} />
        <Route
          path="/index_customer_support"
          element={<CustomerSupportPage />}
        />
        <Route path="/order_success" element={<OrderSuccess />} />
        <Route path="/index_info" element={<InfoPage />} />
        <Route path="/index_search_result" element={<SearchResultPage />} />
      </AnimationRoutes>
      <FooterHome inforHome={inforHome} />
      <React.Fragment key="right">
        <div onClick={toggleDrawer("right", true)}>
          <CartItem />
          <NumberCart />
        </div>
        <Drawer
          anchor="right"
          open={state.right}
          onClose={toggleDrawer("right", false)}
        >
          <div style={{ width: "290px" }}>
            <SliderCart onClose={handleCloseDrawer} />
          </div>
        </Drawer>
      </React.Fragment>
      {showScrollToTop && <BottomToTop onClick={scrollToTop} />}
    </div>
  );
};

export default PageScreen;
