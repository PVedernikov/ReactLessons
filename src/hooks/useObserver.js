import { useEffect, useRef } from 'react';

export const useObserver = (ref, canLoad, isLoading, callback) => {
    const observer = useRef();

    // отслеживание видимости элемента в окне браузера
    useEffect(() => {
        if (isLoading) return; // обзервер создается только когда загрузка закончилась
        if (observer.current) observer.current.disconnect(); // старые обзерверы отключаем
        var cb = function (entries, observer) {
            if (entries[0].isIntersecting && canLoad) {
                callback();
            }
        };
        observer.current = new IntersectionObserver(cb);
        observer.current.observe(ref.current);
    }, [isLoading]);

}