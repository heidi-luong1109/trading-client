import { Intent, MenuItem } from "@blueprintjs/core";
import { ItemPredicate, ItemRenderer } from "@blueprintjs/select";
import * as React from "react";

export const renderSymbol: ItemRenderer<string> = (symbol, { handleClick, modifiers, query }) => {
  if (!modifiers.matchesPredicate) {
      return null;
  }

  return (
    <MenuItem
      active={modifiers.active}
      disabled={modifiers.disabled}
      key={symbol}
      onClick={handleClick}
      text={highlightText(symbol, query)}
    />
  );
};

export const filterSymbol: ItemPredicate<string> = (query: string, symbol: string) => {
  return (symbol.toLowerCase()).indexOf(query.toLowerCase()) >= 0;
};

function highlightText(text: string, query: string) {
  let lastIndex = 0;
  const words = query
      .split(/\s+/)
      .filter(word => word.length > 0)
      .map(escapeRegExpChars);
  if (words.length === 0) {
      return [text];
  }

  const regexp = new RegExp(words.join("|"), "gi");
  const tokens: React.ReactNode[] = [];
  while (true) {
      const match = regexp.exec(text);
      if (!match) {
          break;
      }
      const length = match[0].length;
      const before = text.slice(lastIndex, regexp.lastIndex - length);
      if (before.length > 0) {
          tokens.push(before);
      }
      lastIndex = regexp.lastIndex;
      tokens.push(<strong key={lastIndex}>{match[0]}</strong>);
  }

  const rest = text.slice(lastIndex);
  if (rest.length > 0) {
      tokens.push(rest);
  }

  return tokens;
}

function escapeRegExpChars(text: string) {
  return text.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}
