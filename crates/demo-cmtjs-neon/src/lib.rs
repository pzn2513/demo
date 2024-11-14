use neon::prelude::*;

fn hello(mut cx: FunctionContext) -> JsResult<JsString> {
    Ok(cx.string("hello node"))
}
fn hi(mut cx: FunctionContext) -> JsResult<JsString> {
  Ok(cx.string("hi node"))
}

#[neon::main]
fn main(mut cx: ModuleContext) -> NeonResult<()> {
    cx.export_function("hello", hello)?;
    cx.export_function("hi", hi)?;
    Ok(())
}
