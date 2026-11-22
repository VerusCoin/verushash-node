{
    "targets": [
        {
            "target_name": "verushash",
            "dependencies": [
            ],
            "sources": [
                "crypto/common.h",
                "crypto/haraka.h",
                "crypto/haraka_portable.h",
                "crypto/verus_clhash.h",
                "crypto/verus_hash.h",
                "crypto/haraka.c",
                "crypto/haraka_portable.c",
                "crypto/tinyformat.h",
                "crypto/uint256.cpp",
                "crypto/uint256.h",
                "crypto/utilstrencodings.cpp",
                "crypto/utilstrencodings.h",
                "crypto/verus_hash.cpp",
                "crypto/verus_clhash.cpp",
                "crypto/verus_clhash_portable.cpp",
                "verushash.cc",
            ],
            "include_dirs": [
                "shims",
                ".",
                "<!(node -e \"require('nan')\")",
            ],
            "defines": [
                "ENABLE_VERUS_ISA",
            ],
            "libraries": [
                "-lsodium"
            ],
            "cflags_cc": [
                "-std=c++14",
                "-UNDEBUG",
                "-Wl,--whole-archive",
                "-fPIC",
                "-fexceptions",
                "-Ofast",
                "-march=native",
                "-msse4",
                "-msse4.1",
                "-msse4.2",
                "-mssse3",
                "-mavx",
                "-mpclmul",
                "-maes",
            ],
            "cflags": [
                "-UNDEBUG",
                "-Wl,--whole-archive",
                "-fPIC",
                "-fexceptions",
                "-Ofast",
                "-march=native",
                "-msse4",
                "-msse4.1",
                "-msse4.2",
                "-mssse3",
                "-mavx",
                "-mpclmul",
                "-maes",
            ],
            "link_settings": {
                "libraries": [
                    "-Wl,-rpath,./build/Release/",
                ]
            },
            "configurations": {
                "Release": {
                    "defines!": ["NDEBUG"]
                },
                "Debug": {
                    "defines!": ["NDEBUG"]
                }
            },
            "conditions": [
                ['OS=="mac"', {
                    'xcode_settings': {
                        'GCC_ENABLE_CPP_EXCEPTIONS': 'YES',
                        'CLANG_CXX_LANGUAGE_STANDARD': 'c++14',
                        'GCC_PREPROCESSOR_DEFINITIONS!': ['NDEBUG=1']
                    }
                }]
            ]
        }
    ]
}
