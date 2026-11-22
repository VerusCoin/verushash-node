# verushash-node

Implementation of the VerusHash V1, V2, V2.1, V2.2, and V2.3 hash algorithms as a node.js module.

`hash2b2` reads the solution version at byte 143. Version 9 and above uses VerusHash 2.3. Versions 4 through 8 stay on 2.2. `hash2b3` always uses 2.3.

## For testing purposes:

    sudo apt install libsodium-dev
    git clone https://github.com/veruscoin/verushash-node
    cd verushash-node
    npm install
    node test.js

## Example test.js output:

    'VerusHash1   Output' '2cd709e6569bd706f14a09e62042ddccfa63bd3725b21f35a8c98adbf4151184'
    'VerusHash2   Output' '55cec43b110570481f6d565c3a8bb6ed174956494aeebf4c264283791dbd3ded'
    'VerusHash2b  Output' 'f971af1d4e551e9e71d35c6266fc19a98c6ad0388be1e9979f66921e07b5c9ac'
    'VerusHash2b1 Output' '0ef8b9530ce44a7ffb9b520daf8fcf59d1d22dd1bfa1a26ef4351d51e37071b7'
    'VerusHash2b2 version 4' 'e330fae848bd2d8e587c098e442d840d6c96ec7242e6b56a7cbad4c464efaf53'
    'VerusHash2.3 version 9' '937804a6f3ec9d8d8db6f077db6cdedcc6dd72fce8273079f44117b23f323bfa'

