#!/bin/sh
if [ -z "$husky_skip_init" ]; then
  debug () {
    # 当 HUSKY_DEBUG 存在值为1时，开启debug
    [ "$HUSKY_DEBUG" = "1" ] && echo "husky (debug) - $1"
  }

  readonly hook_name="$(basename "$0")"
  debug "starting $hook_name..."
  # 如果 HUSKY=0，则忽略hook
  if [ "$HUSKY" = "0" ]; then
    debug "HUSKY env variable is set to 0, skipping hook"
    exit 0
  fi
  # 如果存在~/.huskyrc，则执行
  if [ -f ~/.huskyrc ]; then
    debug "sourcing ~/.huskyrc"
    . ~/.huskyrc
  fi
  # 设置husky_skip_init=1，再次执行hook时不再进入该代码块
  export readonly husky_skip_init=1
  # 再次执行当前hook，其中的$0为hook路径，$@为所有参数
  sh -e "$0" "$@"
  exitCode="$?"

  if [ $exitCode != 0 ]; then
    # 打印hook执行失败信息
    echo "husky - $hook_name hook exited with code $exitCode (error)"
    exit $exitCode
  fi

  exit 0
fi
