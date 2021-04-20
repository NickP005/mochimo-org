import { Link } from 'react-router-dom';
import { useWindowSize } from 'MochiMapHooks';

const TransComp = ({ transData }) => {
  const [width] = useWindowSize();
  const pad_with_zeroes = (number, length) => {
    if (Number(number) > 0) {
      return number;
    }
    var my_string = "" + number;
    while (my_string.length < length) {
      my_string = "0" + my_string;
    }

    return my_string;
  };

  return (
    <>
      <div className="et_header">
        <div className="et_h1">
          {width > 500 ? (
            <p>
              Explorer <span>⇢ </span> Transaction history
            </p>
          ) : (
            <p>Transaction history</p>
          )}
        </div>
        <div>✷</div>
      </div>
      <ul className="et_list">
        <li>
          <p>Transaction id</p>
        </li>
        {width > 400 && (
          <li>{width > 500 ? <p>Change total</p> : <p>Chg total</p>}</li>
        )}
        {width > 760 && (
          <li>
            <p>Transaction fee</p>
          </li>
        )}
        <li>
          <p>Send total</p>
        </li>
      </ul>
      {transData?.map((item, index) => {
        return (
          <ul className="et_list et_list_main" key={index}>
            <Link scroll href={`/explorer/transaction/${item.txid}`}>
              <li className="tr_id">
                <p>{item.txid}</p>
              </li>
            </Link>
            {width > 400 && (
              <li>
                <p>{pad_with_zeroes(item.changetotal, 5)}</p>
              </li>
            )}
            {width > 760 && (
              <li>
                <p>{item.txfee}</p>
              </li>
            )}
            <li>
              <p>{pad_with_zeroes(item.sendtotal, 6)}</p>
            </li>
          </ul>
        );
      })}
    </>
  );
};

export default TransComp;
