"use client";
import { useEffect, useState } from "react";
import { MultiFormatItems } from "@/types/MultiformatItems";
import { Button } from "@progress/kendo-react-buttons";
import {
  Card,
  CardActions,
  CardBody,
  CardTitle,
} from "@progress/kendo-react-layout";

export default function ItemCard({ id }: { id: string }) {
  const [book, setBook] = useState<MultiFormatItems | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      handleFetch(id);
    }
  }, [id]);

  const handleFetch = async (id: string) => {
    setError(null);
    setBook(null);

    try {
      const res = await fetch(`/api/rakuten-books/${encodeURIComponent(id)}`);
      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || "取得に失敗しました");
      }

      setBook(json);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
    }
  };

  function getColor() {
    if (error) {
      return "error";
    }

    if (book) {
      if (book.item.delv_date_id !== 22) {
        return "success";
      } else {
        return "warning";
      }
    }

    return undefined;
  }

  function getTitle() {
    if (error) {
      return "取得エラー";
    }

    if (book) {
      return book.item.title;
    }

    return "取得中...";
  }

  function getBody() {
    if (error) {
      return `エラー: ${error}`;
    }
    if (book) {
      return `${book.item.price}円`;
    }

    return "取得中...";
  }

  function getButtonText() {
    if (error) {
      return "取得エラー";
    }
    if (book) {
      return book.item.delv_date_label;
      // return book.item.delv_date_id !== 22 ? "在庫あり" : "在庫なし";
    }
    return "取得中...";
  }

  function getUrl() {
    if (book) {
      return `https://books.rakuten.co.jp/rb/${encodeURIComponent(id)}/`;
    }
  }

  return (
    <>
      <Card style={{ width: 250 }} type={getColor()}>
        <CardBody>
          <CardTitle>{getTitle()}</CardTitle>
          <p>{getBody()}</p>
        </CardBody>
        <CardActions>
          <a href={getUrl()} target="_blank" rel="noopener noreferrer">
            <Button type="button" themeColor={getColor()}>
              {getButtonText()}
            </Button>
          </a>
        </CardActions>
      </Card>
    </>
  );
}
