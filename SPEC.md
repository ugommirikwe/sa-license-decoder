
# ZA Drivers License format

This is the format after the barcode has been decrypted.

The barcode data is a constant 684 bytes, divided into four sections. Parsing rules are different per section.

Since the description here is inferred from a limited collection of sample licenses, it is not a complete specification.
It is important that the parser is as lenient as possible. If one field does not adhere to the specification, skip that field
and continue parsing the rest of the document.

### Sample license data (hexdump)

    00000000  02 6d 16 03 00 32 01 16  82 5a 42 e1 e1 e1 53 41  |.m...2...ZB...SA|
    00000010  4e 44 45 52 53 e0 4a e1  5a 41 e0 5a 41 e0 30 e1  |NDERS.J.ZA.ZA.0.|
    00000020  e1 e1 36 32 33 34 35 36  30 30 30 31 41 42 e0 38  |..6234560001AB.8|
    00000030  36 30 39 31 33 35 31 33  39 30 31 32 02 20 07 02  |609135139012. ..|
    00000040  19 aa a1 0a 01 19 86 09  13 20 12 11 14 20 17 12  |......... ... ..|
    00000050  14 01 57 49 04 00 fa 00  c8 43 2e 28 40 00 28 42  |..WI.....C.(@.(B|
    00000060  34 55 a7 42 bc e8 d2 30  e7 35 e5 5d db df 3b 3b  |4U.B...0.5.]..;;|
    00000070  d3 4c f6 fe 39 ce 41 e6  fe 59 7b 22 f6 f9 70 14  |.L..9.A..Y{"..p.|
    00000080  31 ee f7 eb 16 bd de f7  be 7f 9b de e8 7f f1 c3  |1...............|
    00000090  40 a1 82 87 f2 d1 8b 1c  2d f0 ea 84 e4 a8 58 5e  |@.......-.....X^|
    000000a0  83 43 9a 85 4f 0d 02 85  59 d6 cc 21 7b 54 a3 cf  |.C..O...Y..!{T..|
    000000b0  b8 d3 39 65 d1 19 a9 4a  12 70 ef ce 58 b3 f9 6e  |..9e...J.p..X..n|
    000000c0  0d a8 d0 d6 04 51 92 c1  24 af b1 63 88 a1 d1 30  |.....Q..$..c...0|
    000000d0  ee 30 a7 21 41 18 c2 5f  6a 08 7b 8a e3 71 1c e1  |.0.!A.._j.{..q..|
    000000e0  0c 24 5a c6 38 1a 51 83  95 04 4c 7a c3 4f 1d 26 | .$Z.8.Q...Lz.O.&|
    000000f0  c7 d4 66 5a e1 d0 8c 50  3e 35 a6 bb 69 ba ba e3  |..fZ...P>5..i...|
    00000100  3d 2a 2f 90 77 92 d4 79  a0 5b 8d e2 bb 56 5e 86  |=*/.w..y.[...V^.|
    00000110  5e aa 5e 8c 88 fb 61 6c  86 3e bc 61 14 37 99 8f  |^.^...al.>.a.7..|
    00000120  73 36 82 86 6d 14 bc 6c  30 91 07 24 88 20 4f f8  |s6..m..l0..$. O.|
    00000130  b4 80 01 57 b1 11 c1 20  00 ac b0 5b 81 7e eb 63  |...W... ...[.~.c|
    00000140  e1 92 c4 1e 1b a6 71 ff  47 c2 8d 24 14 05 60 f8  |......q.G..$..`.|
    00000150  7c 4c 15 c1 29 f3 e4 04  58 24 05 62 99 cb 0e 11  ||L..)...X$.b....|
    00000160  12 b6 12 44 34 91 76 12  a9 1d 8d 19 2c 59 f4 96  |...D4.v.....,Y..|
    00000170  35 00 36 fc 63 66 82 d6  14 0f 87 f1 7f 35 7a be  |5.6.cf.......5z.|
    00000180  8f f2 15 57 7a da b6 42  1a d4 44 c0 68 fb bd d7  |...Wz..B..D.h...|
    00000190  f1 61 32 09 75 31 d5 16  a7 9c a7 f1 45 55 9b ec  |.a2.u1......EU..|
    000001a0  05 89 65 b5 20 2f d4 b2  f9 14 3a 42 87 85 26 02  |..e. /....:B..&.|
    000001b0  68 ca ad e6 5a 00 39 71  aa ba 65 97 c2 da 0e 2b  |h...Z.9q..e....+|
    000001c0  84 1c a8 76 e8 8f c4 70  02 a6 ad 10 f1 6b 38 60  |...v...p.....k8`|
    000001d0  ee f4 28 63 44 8f 47 a6  33 e9 82 f4 ec 07 75 46  |..(cD.G.3.....uF|
    000001e0  02 98 fc 43 c4 57 44 f0  bc ce 2d 3d ee 64 81 56  |...C.WD...-=.d.V|
    000001f0  a8 4d 70 67 0e da f4 93  2a 38 c8 3c 2e 72 1b e2  |.Mpg....*8.<.r..|
    00000200  12 47 0b c5 04 19 c4 5b  db 5a ac 04 77 95 9f 7c  |.G.....[.Z..w..||
    00000210  20 03 08 42 0b b4 55 34  5c 6b 89 6c a9 e2 01 f3  | ..B..U4\k.l....|
    00000220  18 d7 5e ec 35 97 6e 1b  44 38 8f 62 2e 49 13 00  |..^.5.n.D8.b.I..|
    00000230  25 58 ed 3d 08 ff 86 fb  a8 d8 76 05 4b 05 8b 24  |%X.=......v.K..$|
    00000240  09 61 ae 90 50 d7 da 0d  8d 2c 11 a3 bd 80 78 ee  |.a..P....,....x.|
    00000250  b0 ae 70 9f 18 86 08 dd  8a 4d 44 02 03 62 28 53  |..p......MD..b(S|
    00000260  77 28 20 92 ea a0 a2 c4  13 24 06 aa db 77 41 67  |w( ......$...wAg|
    00000270  3d 69 d7 dd e6 05 8c e5  aa 2d b5 68 10 05 00 44  |=i.......-.h...D|
    00000280  5a 45 d5 14 45 10 14 59  4b 86 20 a2 aa 20 00 16  |ZE..E..YK. .. ..|
    00000290  3b 50 01 00 14 50 05 55  55 01 04 45 40 55 54 10  |;P...P.UU..E@UT.|
    000002a0  00 00 00 00 00 00 00 00  00 00 00 00              |............|
    000002ac


### Section 0: Header

This section consists of exactly 10 bytes.

| Position | Length (bytes) | Description | Sample (hex) |
| ---------|----------------|-------------|--------------|
| 0        | 1              | Fixed ‘02’ in observed newer licenses, ‘01’ for older one. Ignore. Possibly barcode version number? | 02 |
| 1        | 2              | Mostly random. Ignore. | e3 13 |
| 3        | 1              | Fixed ‘03’ in observed data (including old barcode). Ignore. | 03 |
| 4        | 1              | Fixed ‘00’ in observed data (including old barcode). Ignore. | 00 |
| 5        | 1              | Length in bytes of Section 1. | 32 |
| 6        | 1              | Fixed ‘01’ in observed data. Ignore. | 01 |
| 7        | 1              | Length in bytes of Section 2. | 16 |
| 8        | 2              | Ignore upper 4 bits (fixed ‘8’?). Lower 12 bits is the length in bytes of Section 3. | 82 5a |


### Section 1: Strings

This section consists of a fixed set of delimited strings.

`e0` is the basic delimiter.

`e1` is a delimiter, with the added indication that the next string is empty.
It may either be followed by another `e1`, or by the next string (after the empty group).
`n` consecutive `e1`'s are equivalent to `n+1` consecutive `e0`'s.


| String Index | Description            | String Sample | Hex Sample *Delimiters included afterwards for example only. Delimiters actually depend on the following string as well.* |
| --- | ----------------------          | ------------- | --- |
| 0-3 | Vehicle Codes, up to 4          | C1            | 43 31 e1 e1 e1 |
|     |                                 | A,B           | 41 e0 42 e1 e1 |
|     |                                 | A,B,C,EC      | 41 e0 42 e0 43 e0 45 43 e0 |
| 4   | Surname                         | SMITH         | 53 4d 49 54 48 e0 |
| 5   | Initials                        | JH            | 4a 48 e0 |
| 6   | PrDP Code                       | G,P           | 47 2c 50 e0 |
|     |                                 | (n/a)         | (e1 after previous string) |
| 7   | ID Country of Issue             | ZA            | 5a 41 e0 |
| 8   | License Country of Issue        | ZA            | 5a 41 e0 |
| 9-12 | Vehicle Restriction, up to 4   | 0             | 30 e1 e1 e1 |
|     |                                 | 1,3           | 31 e0 33 e1 e1 |
| 13  | License Number                  | 6234560001AB  | 36 32 33 34 35 36 30 30 30 31 41 42 e0 |
| 14  | ID Number                       | 8609135139012 | 38 36 30 39 31 33 35 31 33  39 30 31 32 |


### Section 2: Binary Data

This section is a stream of nibbles (half-bytes, 4 bits each). For each byte,
the higher 4 bits form the first nibble, the lower 4 bits the second nibble.
This is the same order that is produced in the readable hexadecimal format.


Dates are 8 nibbles (4 bytes) each. It is produced by using each of the 8 nibbles
as a number in the format YYYYMMDD. None of these nibbles should ever be greater than 9,
so it can be interpreted as either decimal or hexadecimal digits.
Each date may also have the special case of a single `a` nibble (in hex).
This indicates that the date is not present.


| Length (nibbles) | Description                      | Sample (hex) |
| ------ | ------------------------------------------ | --- |
| 2      | ID number type. 02 means South African ID. | `0 2` |
| 1 or 8, x4 | 4x License code issue date. Each date either 8 nibbles, or a single `a` nibble. | `a` / `2 0 1 2 0 5 2 2` |
| 2      | Driver restriction codes. A combination of (0-2), (0-2). 0 = none, 1 = glasses, 2 = artificial limb | `0 0` / `1 0` / `2 0` / `1 2` |
| 1 or 8 | PrDP permit expiry date                    | `a` / `2 0 1 2 0 5 2 2` |
| 2      | License issue number. Could be hex or decimal, but is probably never > 9 in practice. | `0 1` |
| 1 or 8 | Birthdate                                  | `1 9 8 6 0 5 2 2` |
| 1 or 8 | License Valid From                         | `2 0 1 2 0 5 2 2` |
| 1 or 8 | License Valid To                           | `2 0 1 7 0 5 2 2` | 
| 2      | Gender. 01 = Male. 02 = Female.            | `0 1` / `0 2` |
| 0 or 1 | `a` as padding to complete the byte, if required. | `a` |


### Block 3: Image Data

Incomplete spec. Ignore this section.

    57 49 ('WI') 04
    00 fa (image height)
    00 c8 (image width)
    43/43/43/42 ('C'/'B') 48/2e/00/6a 28 40 00
    image data?




