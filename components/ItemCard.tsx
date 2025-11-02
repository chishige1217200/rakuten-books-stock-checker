"use client";
import { useEffect, useState } from "react";
import { MultiFormatItems } from "@/types/MultiformatItems";
import { Button } from "@progress/kendo-react-buttons";
import { Checkbox, CheckboxChangeEvent } from "@progress/kendo-react-inputs";
import {
  Card,
  CardActions,
  CardBody,
  CardTitle,
} from "@progress/kendo-react-layout";

export default function ItemCard({ id }: { id: string }) {
  const [book, setBook] = useState<MultiFormatItems | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (id) {
      handleFetch(id);
      restoreChecked(id);
    }
  }, [id]);

  const restoreChecked = (id: string) => {
    const stored = localStorage.getItem(`checked-${id}`);
    if (stored === "1") {
      setChecked(true);
    }
  };

  const onChange = (e: CheckboxChangeEvent) => {
    const value = e.value;
    if (id && value != null) {
      if (value) {
        localStorage.setItem(`checked-${id}`, "1");
      } else {
        localStorage.removeItem(`checked-${id}`);
      }
    }

    setChecked(value);
  };

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

  const getColor = () => {
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
  };

  const getTitle = () => {
    if (error) {
      return "取得エラー";
    }

    if (book) {
      return book.item.title;
    }

    return "取得中...";
  };

  const getBody = () => {
    if (error) {
      return error;
    }
    if (book) {
      return `${book.item.price}円`;
    }

    return "取得中...";
  };

  const getButtonText = () => {
    if (error) {
      return "取得エラー";
    }
    if (book) {
      return book.item.delv_date_label;
    }
    return "取得中...";
  };

  const getUrl = () => {
    if (book) {
      return `https://books.rakuten.co.jp/rb/${encodeURIComponent(id)}/`;
    }
  };

  return (
    <>
      <Card
        style={{ width: 250, outline: checked ? "solid" : "none" }}
        type={getColor()}
      >
        <CardBody>
          <div className="flex justify-between">
            <CardTitle>{getTitle()}</CardTitle>
            <Checkbox checked={checked} onChange={onChange} />
          </div>
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
