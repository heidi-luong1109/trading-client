import { IToastProps, Position, Toaster, Intent } from "@blueprintjs/core";

const toaster = Toaster.create({
  position: Position.TOP_RIGHT,
});

const red = (options: IToastProps) => toaster.show({
  intent: Intent.DANGER,
  ...options,
});

const green = (options: IToastProps) => toaster.show({
  intent: Intent.SUCCESS,
  ...options,
});

const blue = (options: IToastProps) => toaster.show({
  intent: Intent.PRIMARY,
  ...options,
});

const yellow = (options: IToastProps) => toaster.show({
  intent: Intent.WARNING,
  ...options,
});

const white = (options: IToastProps) => toaster.show({
  intent: Intent.NONE,
  ...options,
});

export default {
  red,
  green,
  blue,
  yellow,
  white,
};
