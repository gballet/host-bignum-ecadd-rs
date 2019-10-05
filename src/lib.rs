extern crate ewasm_api;

extern "C" {
    pub fn bignum_add(input: *const u32, output: *mut u32);
} 

#[cfg(not(test))]
#[no_mangle]
pub extern "C" fn main() {
    ewasm_api::consume_gas(500);

    let input = ewasm_api::calldata_acquire();
    let mut output = [0u8; 64];
    unsafe {
    bignum_add(input.as_ptr() as *const u32, output.as_mut_ptr() as *mut u32);
    }
    ewasm_api::finish_data(&output);
}
