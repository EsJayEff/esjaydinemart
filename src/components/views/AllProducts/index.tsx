"use client";

import { oneProductType } from "@/components/utils/ProductsDataArrayAndType";
import { Component, ReactNode } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import BASE_PATH_FOR_API from "@/components/shared/BasePath";
import Card from "../Card";

interface propsType {
  ProductArray: oneProductType[];
}

export default class AllProductsComponent extends Component<{
  ProductData: propsType;
}> {
  start: number = 10;
  end: number = 20;
  state: { items: Array<oneProductType>; hasMore: boolean } = {
    items: [...this.props.ProductData.ProductArray],
    hasMore: true,
  };

  fetchDataFromAPIGradually = async (start: number, end: number) => {
    const res = await fetch(
      `${BASE_PATH_FOR_API}/api/products?start=${start}&end=${end}`
    );
    const dataToCheckAndSend = await res.json();
    if (dataToCheckAndSend.ProductArray === "Not Found") {
      this.setState({
        hasMore: false,
      });
    }
    return dataToCheckAndSend;
  };

  getData = async () => {
    let allTogether = await this.fetchDataFromAPIGradually(
      this.start,
      this.end
    );
    if (allTogether.ProductArray !== "Not Found") {
      this.setState({
        items: this.state.items.concat(allTogether.ProductArray)
      })
    } else {
      this.setState({
        hasMore: false,
      });
    }
    this.start = this.start + 10;
    this.end = this.end + 10;
  };
  render(): ReactNode {
    return (
      <div onClick={this.getData}>
        <InfiniteScroll
          dataLength={this.state.items.length} //This is important field to render the next data
          next={this.getData}
          hasMore={this.state.hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }} >
              <br/><br/><br/><br/><br/><b>End of collection.</b>
            </p>
          }
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {this.state.items.map((items: oneProductType, index: number) => (
            <Card singleProductData={items} />
          ))}
        </InfiniteScroll>
      </div>
    );
  }
}
